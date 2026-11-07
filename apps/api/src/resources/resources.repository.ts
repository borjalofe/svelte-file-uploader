import { randomUUID } from 'node:crypto';
import type { Resource, ResourceCreate } from '@pack-challenge/domain';

export type CreateResourceRow = ResourceCreate & {
	storagePath: string;
};

export type ListResourcesQuery = {
	limit: number;
	offset: number;
};

export type ListResourcesResult = {
	items: Resource[];
	total: number;
};

export interface ResourcesRepository {
	insert(row: CreateResourceRow): Promise<Resource>;
	findById(id: string): Promise<Resource | null>;
	list(query: ListResourcesQuery): Promise<ListResourcesResult>;
}

/** In-memory stand-in for Postgres (CI / unit). Same row shape as `resourceSchema`. */
export class MemoryResourcesRepository implements ResourcesRepository {
	private readonly rows = new Map<string, Resource>();

	async insert(row: CreateResourceRow): Promise<Resource> {
		const now = new Date();
		const resource: Resource = {
			...row,
			id: randomUUID(),
			createdAt: now,
			updatedAt: now
		};
		this.rows.set(resource.id, resource);
		return resource;
	}

	async findById(id: string): Promise<Resource | null> {
		return this.rows.get(id) ?? null;
	}

	async list(query: ListResourcesQuery): Promise<ListResourcesResult> {
		const items = [...this.rows.values()].sort(
			(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
		);
		const total = items.length;
		return {
			items: items.slice(query.offset, query.offset + query.limit),
			total
		};
	}
}
