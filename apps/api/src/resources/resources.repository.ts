import { randomUUID } from 'node:crypto';
import type { Resource, ResourceCreate, ResourceList, ResourceListQuery } from '@pack-challenge/domain';

export type CreateResourceRow = ResourceCreate & {
	storagePath: string;
};

export interface ResourcesRepository {
	insert(row: CreateResourceRow): Promise<Resource>;
	findById(id: string): Promise<Resource | null>;
	/** List/search — `q` matches title + description (case-insensitive substring). */
	list(query: ResourceListQuery): Promise<ResourceList>;
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

	async list(query: ResourceListQuery): Promise<ResourceList> {
		let items = [...this.rows.values()];

		if (query.q) {
			const needle = query.q.toLowerCase();
			items = items.filter(
				(row) =>
					row.title.toLowerCase().includes(needle) ||
					row.description.toLowerCase().includes(needle)
			);
		}
		if (query.category) {
			items = items.filter((row) => row.category === query.category);
		}
		if (query.language) {
			items = items.filter((row) => row.language === query.language);
		}
		if (query.provider) {
			items = items.filter((row) => row.provider === query.provider);
		}
		if (query.role) {
			items = items.filter((row) => row.roles.includes(query.role!));
		}

		items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
		const total = items.length;
		const page = items.slice(query.offset, query.offset + query.limit);

		return { items: page, total, limit: query.limit, offset: query.offset };
	}
}
