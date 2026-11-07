import {
	RESOURCE_CATEGORIES,
	RESOURCE_DESCRIPTION_MAX,
	RESOURCE_FILE_NAME_MAX,
	RESOURCE_FILE_SIZE_MAX,
	RESOURCE_LANGUAGES,
	RESOURCE_PROVIDERS,
	RESOURCE_TITLE_MAX
} from '@pack-challenge/domain';
import { getTableColumns, getTableName } from 'drizzle-orm';
import { describe, expect, it } from 'vitest';
import { resources } from './schema.js';

describe('resources table schema (#68)', () => {
	it('is named resources and exposes Zod-mapped columns', () => {
		expect(getTableName(resources)).toBe('resources');

		const cols = getTableColumns(resources);
		expect(Object.keys(cols).sort()).toEqual(
			[
				'id',
				'title',
				'description',
				'category',
				'language',
				'provider',
				'roles',
				'fileOriginalName',
				'fileMimeType',
				'fileSize',
				'storagePath',
				'createdAt',
				'updatedAt'
			].sort()
		);

		expect(cols.title.dataType).toBe('string');
		expect(cols.storagePath.name).toBe('storage_path');
		expect(cols.fileOriginalName.name).toBe('file_original_name');
		expect(cols.fileMimeType.name).toBe('file_mime_type');
		expect(cols.fileSize.name).toBe('file_size');
		expect(cols.createdAt.name).toBe('created_at');
		expect(cols.updatedAt.name).toBe('updated_at');
	});

	it('reuses domain length caps and enum value sets', () => {
		expect(RESOURCE_TITLE_MAX).toBe(200);
		expect(RESOURCE_DESCRIPTION_MAX).toBe(1000);
		expect(RESOURCE_FILE_NAME_MAX).toBe(255);
		expect(RESOURCE_FILE_SIZE_MAX).toBe(50 * 1024 * 1024);
		expect([...RESOURCE_CATEGORIES]).toEqual([
			'conflict-resolution',
			'leadership',
			'communication'
		]);
		expect([...RESOURCE_LANGUAGES]).toEqual(['en', 'es', 'fr']);
		expect([...RESOURCE_PROVIDERS]).toEqual(['pack', 'partner']);
	});
});
