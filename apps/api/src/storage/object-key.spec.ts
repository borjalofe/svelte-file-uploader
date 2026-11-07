import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildResourceObjectKey, resolveStoragePath } from './object-key.js';

describe('object-key (#69)', () => {
	it('builds a random resources/<uuid>.<ext> key from MIME (not client name)', () => {
		const key = buildResourceObjectKey('application/pdf');
		expect(key).toMatch(/^resources\/[0-9a-f-]{36}\.pdf$/);
	});

	it('resolves keys under the storage root', () => {
		const root = path.resolve('/tmp/pack-store');
		const resolved = resolveStoragePath(root, 'resources/abc.pdf');
		expect(resolved).toBe(path.join(root, 'resources', 'abc.pdf'));
	});

	it('rejects path traversal and absolute keys', () => {
		const root = path.resolve('/tmp/pack-store');
		expect(resolveStoragePath(root, '../outside.pdf')).toBeNull();
		expect(resolveStoragePath(root, 'resources/../../etc/passwd')).toBeNull();
		expect(resolveStoragePath(root, '/etc/passwd')).toBeNull();
	});
});
