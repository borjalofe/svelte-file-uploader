#!/usr/bin/env node
/**
 * Consumer contract gate (#62 + #63):
 * 0) public export allowlist ↔ index.ts + root-only exports map (`public-exports.mjs`)
 * 1) package.json `exports` targets must exist on disk
 * 2) `pnpm pack --dry-run --json` must include those targets
 * 3) `pnpm publish --dry-run --no-git-checks` must succeed
 *
 * A missing/broken export path fails this script (and CI job `consumer-contract`).
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertAllowlistMatchesIndex, assertPackageExportsMap } from './public-exports.mjs';

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const packageJsonPath = join(packageRoot, 'package.json');
const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

console.log('Checking public export allowlist (#63)…');
try {
	assertPackageExportsMap();
	const names = assertAllowlistMatchesIndex();
	console.log(`  ok allowlist (${names.length} root exports)`);
} catch (error) {
	fail(error instanceof Error ? error.message : String(error));
}

if (pkg.name !== '@pack-challenge/ui') {
	fail(`Expected package name @pack-challenge/ui, got ${pkg.name}`);
}

if (!pkg.exports || typeof pkg.exports !== 'object') {
	fail('package.json is missing an exports map');
}

/** @param {unknown} node @param {string[]} out */
function collectExportTargets(node, out = []) {
	if (typeof node === 'string') {
		out.push(node);
		return out;
	}
	if (Array.isArray(node)) {
		for (const item of node) collectExportTargets(item, out);
		return out;
	}
	if (node && typeof node === 'object') {
		for (const value of Object.values(node)) collectExportTargets(value, out);
	}
	return out;
}

/** @param {string} message */
function fail(message) {
	console.error(`consumer-contract: ${message}`);
	process.exit(1);
}

const targets = [...new Set(collectExportTargets(pkg.exports))];
if (targets.length === 0) {
	fail('exports map has no file targets');
}

console.log('Checking export targets exist…');
for (const target of targets) {
	const absolute = join(packageRoot, target);
	if (!existsSync(absolute)) {
		fail(`broken export — missing file: ${target}`);
	}
	console.log(`  ok ${target}`);
}

console.log('Running pnpm pack --dry-run --json…');
const packRaw = execFileSync('pnpm', ['pack', '--dry-run', '--json'], {
	cwd: packageRoot,
	encoding: 'utf8',
	stdio: ['ignore', 'pipe', 'pipe']
});

// prepare hooks may print before the JSON payload — slice to the object.
const jsonStart = packRaw.indexOf('{');
const jsonEnd = packRaw.lastIndexOf('}');
if (jsonStart < 0 || jsonEnd < jsonStart) {
	fail('pnpm pack --dry-run --json did not return a JSON object');
}

/** @type {{ files?: { path: string }[] }} */
let packMeta;
try {
	packMeta = JSON.parse(packRaw.slice(jsonStart, jsonEnd + 1));
} catch {
	fail('pnpm pack --dry-run --json did not return valid JSON');
}

const packed = new Set((packMeta.files ?? []).map((f) => f.path.replaceAll('\\', '/')));
if (packed.size === 0) {
	fail('pack dry-run listed no files');
}

for (const target of targets) {
	const normalized = relative(packageRoot, join(packageRoot, target)).replaceAll('\\', '/');
	if (!packed.has(normalized)) {
		fail(`broken export — not included in pack dry-run: ${normalized}`);
	}
	console.log(`  packed ${normalized}`);
}

console.log('Running pnpm publish --dry-run --no-git-checks…');
execFileSync('pnpm', ['publish', '--dry-run', '--no-git-checks'], {
	cwd: packageRoot,
	stdio: 'inherit'
});

console.log('consumer-contract: export map + publish dry-run OK');
