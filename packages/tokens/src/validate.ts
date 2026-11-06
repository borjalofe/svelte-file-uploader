import { pathToFileURL } from 'node:url';
import { forbiddenPathReason } from './forbidden.js';
import { collectLeaves, isPlainObject, isTokenLeaf, loadTokenFiles, type JsonObject } from './load-tokens.js';
import { tokensDir } from './paths.js';

const ALIAS_RE = /^\{([^{}]+)\}$/;

export type ValidationResult = {
  ok: boolean;
  errors: string[];
  leafCount: number;
  files: string[];
};

export function validateTokenTree(tree: JsonObject, files: string[] = []): ValidationResult {
  const errors: string[] = [];
  const leaves = collectLeaves(tree);
  const byPath = new Map(leaves.map((leaf) => [leaf.path, leaf]));

  for (const leaf of leaves) {
    const forbidden = forbiddenPathReason(leaf.path);
    if (forbidden) errors.push(forbidden);

    if (typeof leaf.value === 'string') {
      const match = ALIAS_RE.exec(leaf.value.trim());
      if (match) {
        const target = match[1]!;
        const aliasErrors = resolveAlias(target, byPath, new Set([leaf.path]));
        errors.push(...aliasErrors.map((msg) => `${leaf.path}: ${msg}`));
      }
    }
  }

  for (const groupPath of collectGroupPaths(tree)) {
    const forbidden = forbiddenPathReason(groupPath);
    if (forbidden) errors.push(forbidden);
  }

  return { ok: errors.length === 0, errors, leafCount: leaves.length, files };
}

function resolveAlias(
  targetPath: string,
  byPath: Map<string, { path: string; value: unknown }>,
  stack: Set<string>
): string[] {
  if (stack.has(targetPath)) {
    return [`cyclic alias involving "{${targetPath}}"`];
  }

  const target = byPath.get(targetPath);
  if (!target) {
    return [`invalid alias "{${targetPath}}" (target not found)`];
  }

  if (typeof target.value === 'string') {
    const match = ALIAS_RE.exec(target.value.trim());
    if (match) {
      const next = new Set(stack);
      next.add(targetPath);
      return resolveAlias(match[1]!, byPath, next);
    }
  }

  return [];
}

function collectGroupPaths(node: unknown, pathParts: string[] = []): string[] {
  if (!isPlainObject(node) || isTokenLeaf(node)) return [];

  const paths: string[] = [];
  if (pathParts.length > 0) paths.push(pathParts.join('.'));

  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    paths.push(...collectGroupPaths(child, [...pathParts, key]));
  }
  return paths;
}

export function validateTokensDir(dir: string = tokensDir): ValidationResult {
  const { files, tree } = loadTokenFiles(dir);
  return validateTokenTree(tree, files);
}

function main(): void {
  const result = validateTokensDir();
  console.log(
    `Validated ${result.files.length} file(s), ${result.leafCount} token leaf/leaves under ${tokensDir}`
  );
  if (!result.ok) {
    console.error('Token validation failed:');
    for (const error of result.errors) console.error(` - ${error}`);
    process.exit(1);
  }
  console.log('Token validation OK');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
