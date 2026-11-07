import type { ResourcesDataTableRow } from '../../organisms/resources-data-table/types.js';

/** Empty catalog — toolbar: only All enabled. */
export const RESOURCES_CATALOG_EMPTY: readonly ResourcesDataTableRow[] = [];

/** Single-type catalog — toolbar: All + Videos enabled. */
export const RESOURCES_CATALOG_VIDEOS_ONLY: readonly ResourcesDataTableRow[] = [
	{
		id: 'v1',
		title: 'Intro to Pack',
		path: '/resources/intro',
		viewCount: 42,
		uploadedBy: 'Ada Lovelace',
		provider: 'AWS',
		type: 'videos'
	},
	{
		id: 'v2',
		title: 'Conflict Resolution Walkthrough',
		path: '/resources/conflict-video',
		viewCount: 18,
		uploadedBy: 'Grace Hopper',
		provider: 'GCP',
		type: 'videos'
	}
];

/** Mixed-type catalog — toolbar: All + Videos + Documents + Lessons (+ Archive if present). */
export const RESOURCES_CATALOG_MIXED: readonly ResourcesDataTableRow[] = [
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
	},
	{
		id: '4',
		title: 'Archived onboarding deck',
		path: '/resources/archive/onboarding',
		viewCount: 3,
		uploadedBy: 'Grace Hopper',
		provider: 'AWS',
		type: 'archive'
	}
];
