/**
 * Parse root public export names from packages/ui/src/lib/index.ts
 * and optionally compare to the committed allowlist.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const uiRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = path.join(uiRoot, 'src/lib/index.ts');
const allowlistPath = path.join(uiRoot, 'src/lib/public-exports.allowlist.json');
const packageJsonPath = path.join(uiRoot, 'package.json');

/** @returns {string[]} */
export function parseIndexExports(source = fs.readFileSync(indexPath, 'utf8')) {
	const names = new Set();
	for (const match of source.matchAll(/export\s+(?:type\s+)?\{([^}]+)\}/gs)) {
		for (const part of match[1].split(',')) {
			const cleaned = part
				.replace(/\/\*[\s\S]*?\*\//g, '')
				.replace(/\/\/.*$/gm, '')
				.trim();
			if (!cleaned) continue;
			const name = cleaned.split(/\s+as\s+/).pop()?.trim();
			if (name) names.add(name);
		}
	}
	return [...names].sort((a, b) => a.localeCompare(b));
}

export function readAllowlist() {
	const raw = JSON.parse(fs.readFileSync(allowlistPath, 'utf8'));
	if (!Array.isArray(raw.exports)) {
		throw new Error(`${allowlistPath} missing exports array`);
	}
	return [...raw.exports].sort((a, b) => a.localeCompare(b));
}

export function writeAllowlist(exports) {
	const payload = {
		description:
			'Public @pack-challenge/ui root exports — keep in sync with src/lib/index.ts (pnpm exports:check)',
		exports
	};
	fs.writeFileSync(allowlistPath, `${JSON.stringify(payload, null, '\t')}\n`);
}

/** Ensure package.json exports map only exposes the package root. */
export function assertPackageExportsMap() {
	const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
	const keys = Object.keys(pkg.exports ?? {});
	const allowed = new Set(['.']);
	const unexpected = keys.filter((k) => !allowed.has(k));
	if (unexpected.length) {
		throw new Error(
			`package.json "exports" must only expose "." for preprod; unexpected: ${unexpected.join(', ')}`
		);
	}
	if (!keys.includes('.')) {
		throw new Error('package.json "exports" missing "." entry');
	}
	const root = pkg.exports['.'];
	for (const condition of ['types', 'svelte', 'default']) {
		if (!root?.[condition]) {
			throw new Error(`package.json exports["."] missing "${condition}" condition`);
		}
		if (!String(root[condition]).endsWith('src/lib/index.ts')) {
			throw new Error(`exports["."].${condition} must point at src/lib/index.ts`);
		}
	}
}

export function assertAllowlistMatchesIndex() {
	const actual = parseIndexExports();
	const expected = readAllowlist();
	const missing = expected.filter((n) => !actual.includes(n));
	const extra = actual.filter((n) => !expected.includes(n));
	if (missing.length || extra.length) {
		const lines = [
			'Public export surface drift detected.',
			missing.length ? `Missing from index.ts (still in allowlist): ${missing.join(', ')}` : '',
			extra.length ? `New in index.ts (not in allowlist): ${extra.join(', ')}` : '',
			'Update src/lib/public-exports.allowlist.json intentionally, then re-run exports:check.'
		].filter(Boolean);
		throw new Error(lines.join('\n'));
	}
	return actual;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
	const cmd = process.argv[2] ?? 'check';
	try {
		if (cmd === 'write') {
			assertPackageExportsMap();
			const exports = parseIndexExports();
			writeAllowlist(exports);
			console.log(`Wrote ${exports.length} public exports → ${path.relative(uiRoot, allowlistPath)}`);
		} else if (cmd === 'check') {
			assertPackageExportsMap();
			const exports = assertAllowlistMatchesIndex();
			console.log(`Public export surface OK (${exports.length} names; root-only exports map).`);
		} else {
			throw new Error(`Unknown command "${cmd}" (use check|write)`);
		}
	} catch (error) {
		console.error(error instanceof Error ? error.message : error);
		process.exit(1);
	}
}
