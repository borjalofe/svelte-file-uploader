import { and, count, desc, eq, ilike, or, sql, type SQL } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type {
	Resource,
	ResourceCategory,
	ResourceLanguage,
	ResourceList,
	ResourceListQuery,
	ResourceProvider,
	ResourceRole
} from '@pack-challenge/domain';
import * as schema from '../db/schema.js';
import { toIlikeSubstring } from './like-pattern.js';
import type { CreateResourceRow, ResourcesRepository } from './resources.repository.js';

type Db = PostgresJsDatabase<typeof schema>;

/** Drizzle-backed repository — uses #68 `resources` table. */
export class DrizzleResourcesRepository implements ResourcesRepository {
	constructor(private readonly db: Db) {}

	async insert(row: CreateResourceRow): Promise<Resource> {
		const [inserted] = await this.db
			.insert(schema.resources)
			.values({
				title: row.title,
				description: row.description,
				category: row.category,
				language: row.language,
				provider: row.provider,
				roles: row.roles,
				fileOriginalName: row.file.originalName,
				fileMimeType: row.file.mimeType,
				fileSize: row.file.size,
				storagePath: row.storagePath
			})
			.returning();

		if (!inserted) {
			throw new Error('Insert returned no row');
		}
		return mapRow(inserted);
	}

	async findById(id: string): Promise<Resource | null> {
		const [row] = await this.db
			.select()
			.from(schema.resources)
			.where(eq(schema.resources.id, id))
			.limit(1);
		return row ? mapRow(row) : null;
	}

	async list(query: ResourceListQuery): Promise<ResourceList> {
		const where = buildWhere(query);

		const countQuery = this.db.select({ value: count() }).from(schema.resources);
		const [{ value: total }] = where
			? await countQuery.where(where)
			: await countQuery;

		const listQuery = this.db
			.select()
			.from(schema.resources)
			.orderBy(desc(schema.resources.createdAt))
			.limit(query.limit)
			.offset(query.offset);

		const rows = where ? await listQuery.where(where) : await listQuery;

		return {
			items: rows.map(mapRow),
			total: Number(total),
			limit: query.limit,
			offset: query.offset
		};
	}
}

function buildWhere(query: ResourceListQuery): SQL | undefined {
	const parts: SQL[] = [];

	if (query.q) {
		const pattern = toIlikeSubstring(query.q);
		parts.push(
			or(
				ilike(schema.resources.title, pattern),
				ilike(schema.resources.description, pattern)
			)!
		);
	}
	if (query.category) {
		parts.push(eq(schema.resources.category, query.category));
	}
	if (query.language) {
		parts.push(eq(schema.resources.language, query.language));
	}
	if (query.provider) {
		parts.push(eq(schema.resources.provider, query.provider));
	}
	if (query.role) {
		parts.push(sql`${query.role} = ANY(${schema.resources.roles})`);
	}

	if (parts.length === 0) {
		return undefined;
	}
	if (parts.length === 1) {
		return parts[0];
	}
	return and(...parts);
}

function mapRow(row: schema.ResourceRow): Resource {
	return {
		id: row.id,
		title: row.title,
		description: row.description,
		category: row.category as ResourceCategory,
		language: row.language as ResourceLanguage,
		provider: row.provider as ResourceProvider,
		roles: row.roles as ResourceRole[],
		file: {
			originalName: row.fileOriginalName,
			mimeType: row.fileMimeType as Resource['file']['mimeType'],
			size: Number(row.fileSize)
		},
		storagePath: row.storagePath,
		createdAt: row.createdAt,
		updatedAt: row.updatedAt
	};
}
