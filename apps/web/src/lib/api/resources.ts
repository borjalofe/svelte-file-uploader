import {
	resourceListSchema,
	resourceSchema,
	type Resource,
	type ResourceListQueryInput
} from '@pack-challenge/domain';
import type { ResourcesDataTableRow } from '@pack-challenge/ui';
import { z } from 'zod';
import { getPublicApiUrl } from './config.js';
import { mapResourceToTableRow } from '../resources/map-resource-row.js';

export type ListResourcesInput = Pick<ResourceListQueryInput, 'q' | 'limit' | 'offset'>;

/** Public list items omit `storagePath` (Nest strips it for safe file meta). */
const publicResourceSchema = resourceSchema.omit({ storagePath: true });
const publicResourceListSchema = resourceListSchema.extend({
	items: z.array(publicResourceSchema)
});

export type CreateResourceInput = {
	title: string;
	description: string;
	category: string;
	language: string;
	provider: string;
	roles: string[];
	file: File;
};

export class ApiError extends Error {
	readonly status: number;
	readonly issues: { path: string; message: string }[];

	constructor(message: string, status: number, issues: { path: string; message: string }[] = []) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
		this.issues = issues;
	}
}

/** Format Nest validation / HTTP errors for toasts. */
export function formatApiError(err: unknown): string {
	if (err instanceof ApiError) {
		if (err.issues.length > 0) {
			return err.issues.map((issue) => issue.message).join('; ');
		}
		return err.message;
	}
	if (err instanceof Error) {
		return err.message;
	}
	return 'Request failed';
}

async function readApiError(response: Response): Promise<ApiError> {
	let message = `Request failed (${response.status})`;
	let issues: { path: string; message: string }[] = [];
	try {
		const body: unknown = await response.json();
		if (body && typeof body === 'object') {
			const record = body as Record<string, unknown>;
			if (typeof record.message === 'string') {
				message = record.message;
			} else if (Array.isArray(record.message)) {
				message = record.message.map(String).join('; ');
			}
			if (Array.isArray(record.issues)) {
				issues = record.issues
					.filter(
						(issue): issue is { path: unknown; message: unknown } =>
							!!issue && typeof issue === 'object'
					)
					.map((issue) => ({
						path: String(issue.path ?? ''),
						message: String(issue.message ?? 'Invalid value')
					}));
			}
		}
	} catch {
		// non-JSON body — keep status message
	}
	return new ApiError(message, response.status, issues);
}

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
		throw await readApiError(response);
	}

	const parsed = publicResourceListSchema.parse(await response.json());
	return parsed.items.map((item) => mapResourceToTableRow(item));
}

/** POST /resources — multipart create (field `file` + metadata). */
export async function createResource(
	input: CreateResourceInput,
	fetchImpl: typeof fetch = fetch
): Promise<Resource> {
	const body = new FormData();
	body.set('title', input.title);
	body.set('description', input.description);
	body.set('category', input.category);
	body.set('language', input.language);
	body.set('provider', input.provider);
	body.set('roles', JSON.stringify(input.roles));
	body.set('file', input.file, input.file.name);

	const response = await fetchImpl(new URL('/resources', `${getPublicApiUrl()}/`), {
		method: 'POST',
		body
	});

	if (!response.ok) {
		throw await readApiError(response);
	}

	return resourceSchema.parse(await response.json());
}
