import { resourceListSchema, type ResourceListQueryInput } from '@pack-challenge/domain';
import type { ResourcesDataTableRow } from '@pack-challenge/ui';
import { getPublicApiUrl } from './config.js';
import { mapResourceToTableRow } from '../resources/map-resource-row.js';

export type ListResourcesInput = Pick<ResourceListQueryInput, 'q' | 'limit' | 'offset'>;

/** GET /resources — live list/search (`q` matches title OR description on the API). */
export async function listResources(
	input: ListResourcesInput = {},
	fetchImpl: typeof fetch = fetch
): Promise<ResourcesDataTableRow[]> {
	const url = new URL('/resources', `${getPublicApiUrl()}/`);
	if (input.q?.trim()) {
		url.searchParams.set('q', input.q.trim());
	}
	url.searchParams.set('limit', String(input.limit ?? 100));
	if (input.offset != null) {
		url.searchParams.set('offset', String(input.offset));
	}

	const response = await fetchImpl(url);
	if (!response.ok) {
		throw new Error(`Failed to list resources (${response.status})`);
	}

	const parsed = resourceListSchema.parse(await response.json());
	return parsed.items.map(mapResourceToTableRow);
}
