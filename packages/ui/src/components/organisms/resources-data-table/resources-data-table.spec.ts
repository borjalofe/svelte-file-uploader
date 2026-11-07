import { describe, expect, it } from 'vitest';
import {
	RESOURCE_CONTENT_TYPES,
	countResourceTypes,
	resolveResourcesDataTableRoot,
	sortResourceRows
} from './resources-data-table.js';
import type { ResourcesDataTableRow } from './types.js';

const sampleRows: ResourcesDataTableRow[] = [
	{
		id: '1',
		title: 'Beta',
		path: '/b',
		viewCount: 2,
		uploadedBy: 'Ada',
		provider: 'AWS',
		type: 'document'
	},
	{
		id: '2',
		title: 'Alpha',
		path: '/a',
		viewCount: 10,
		uploadedBy: 'Grace',
		provider: 'GCP',
		type: 'video'
	},
	{
		id: '3',
		title: 'Gamma',
		path: '/c',
		viewCount: 1,
		uploadedBy: 'Ada',
		provider: 'AWS',
		type: 'video'
	}
];

describe('ResourcesDataTable organism (#50)', () => {
	it('exposes type metadata counts for toolbar tab enablement', () => {
		expect(RESOURCE_CONTENT_TYPES).toEqual(['video', 'document', 'lesson', 'archive']);
		expect(countResourceTypes(sampleRows)).toEqual({
			video: 2,
			document: 1,
			lesson: 0,
			archive: 0
		});
	});

	it('sorts rows by column without inventing raw brand hex in chrome', () => {
		const byTitle = sortResourceRows(sampleRows, 'title', 'asc');
		expect(byTitle.map((r) => r.title)).toEqual(['Alpha', 'Beta', 'Gamma']);

		const byViews = sortResourceRows(sampleRows, 'viewCount', 'desc');
		expect(byViews.map((r) => r.viewCount)).toEqual([10, 2, 1]);

		const root = resolveResourcesDataTableRoot({ class: 'mt-2' });
		expect(root.className).toContain('w-full');
		expect(root.className).toContain('mt-2');
		expect(root.className).not.toMatch(/#[0-9a-fA-F]{3,8}/);
	});
});
