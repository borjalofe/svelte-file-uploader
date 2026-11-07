import type { ResourcesDataTableRow } from './types.js';

/** Shared Storybook demo rows (typed for svelte-check). */
export const resourcesDataTableDemoRows: ResourcesDataTableRow[] = [
	{
		id: '1',
		title: 'Intro to Pack',
		path: '/resources/intro',
		viewCount: 42,
		uploadedBy: 'Ada Lovelace',
		provider: 'AWS',
		type: 'videos'
	},
	{
		id: '2',
		title: 'Design tokens',
		path: '/resources/tokens',
		viewCount: 12,
		uploadedBy: 'Grace Hopper',
		provider: 'GCP',
		type: 'documents'
	},
	{
		id: '3',
		title: 'Mentorship 101',
		path: '/resources/mentor',
		viewCount: 7,
		uploadedBy: 'Ada Lovelace',
		provider: 'AWS',
		type: 'lessons'
	}
];
