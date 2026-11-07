import { randomUUID } from 'node:crypto';
import type { Resource, ResourceCreate } from '@pack-challenge/domain';

export type CreateResourceRow = ResourceCreate & {
	storagePath: string;
};

export interface ResourcesRepository {
	insert(row: CreateResourceRow): Promise<Resource>;
	findById(id: string): Promise<Resource | null>;
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
}
