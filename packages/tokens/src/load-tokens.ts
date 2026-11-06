import fs from 'node:fs';
import path from 'node:path';

export type JsonObject = Record<string, unknown>;

export type TokenLeaf = {
  path: string;
  value: unknown;
  type?: string;
};

const META_KEYS = new Set(['$value', '$type', '$description', '$extensions', '$deprecated']);

export function isPlainObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isTokenLeaf(node: JsonObject): boolean {
  return Object.prototype.hasOwnProperty.call(node, '$value');
}

/** Deep-merge token JSON files (later files win on conflict). */
export function mergeTokenTrees(trees: JsonObject[]): JsonObject {
  const out: JsonObject = {};
  for (const tree of trees) {
    deepMerge(out, tree);
  }
  return out;
}

function deepMerge(target: JsonObject, source: JsonObject): void {
  for (const [key, value] of Object.entries(source)) {
    if (isPlainObject(value) && isPlainObject(target[key])) {
      deepMerge(target[key] as JsonObject, value);
    } else {
      target[key] = value;
    }
  }
}

export function collectLeaves(node: unknown, pathParts: string[] = []): TokenLeaf[] {
  if (!isPlainObject(node)) return [];

  if (isTokenLeaf(node)) {
    return [
      {
        path: pathParts.join('.'),
        value: node.$value,
        type: typeof node.$type === 'string' ? node.$type : undefined
      }
    ];
  }

  const leaves: TokenLeaf[] = [];
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$') || META_KEYS.has(key)) continue;
    leaves.push(...collectLeaves(child, [...pathParts, key]));
  }
  return leaves;
}

export function loadTokenFiles(dir: string): { files: string[]; tree: JsonObject } {
  if (!fs.existsSync(dir)) {
    return { files: [], tree: {} };
  }

  const files = walkJsonFiles(dir);
  const trees = files.map((file) => {
    const raw = fs.readFileSync(file, 'utf8');
    const parsed: unknown = JSON.parse(raw);
    if (!isPlainObject(parsed)) {
      throw new Error(`${file}: root must be a JSON object`);
    }
    return parsed;
  });

  return { files, tree: mergeTokenTrees(trees) };
}

function walkJsonFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkJsonFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      out.push(full);
    }
  }
  return out.sort();
}
