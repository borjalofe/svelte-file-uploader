<script lang="ts">
	import { ResourcesDataTable } from './index.js';
	import type { ResourcesDataTableRow } from './types.js';

	const rows: ResourcesDataTableRow[] = [
		{
			id: '1',
			title: 'Intro to Pack',
			path: '/resources/intro',
			viewCount: 42,
			uploadedBy: 'Ada Lovelace',
			provider: 'AWS',
			type: 'video'
		},
		{
			id: '2',
			title: 'Design tokens',
			path: '/resources/tokens',
			viewCount: 12,
			uploadedBy: 'Grace Hopper',
			provider: 'GCP',
			type: 'document'
		}
	];
</script>

<ResourcesDataTable {rows} caption="Uploaded content" />
