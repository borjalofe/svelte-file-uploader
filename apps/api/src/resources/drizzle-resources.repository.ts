import { count, desc, eq } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type {
	Resource,
	ResourceCategory,
	ResourceLanguage,
	ResourceProvider,
	ResourceRole
} from '@pack-challenge/domain';
import * as schema from '../db/schema.js';
import type {
	CreateResourceRow,
	ListResourcesQuery,
	ListResourcesResult,
	ResourcesRepository
} from './resources.repository.js';

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

	async list(query: ListResourcesQuery): Promise<ListResourcesResult> {
		const [totalRow] = await this.db.select({ value: count() }).from(schema.resources);
		const total = Number(totalRow?.value ?? 0);
		const rows = await this.db
			.select()
			.from(schema.resources)
			.orderBy(desc(schema.resources.createdAt))
			.limit(query.limit)
			.offset(query.offset);
		return {
			items: rows.map(mapRow),
			total
		};
	}
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
