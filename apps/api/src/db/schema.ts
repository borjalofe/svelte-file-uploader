/**
 * Postgres schema for Resource rows — column shapes map to
 * `@pack-challenge/domain` `resourceSchema` (flattened file metadata + storage path).
 */
import {
	RESOURCE_CATEGORIES,
	RESOURCE_DESCRIPTION_MAX,
	RESOURCE_FILE_NAME_MAX,
	RESOURCE_FILE_SIZE_MAX,
	RESOURCE_LANGUAGES,
	RESOURCE_PROVIDERS,
	RESOURCE_TITLE_MAX
} from '@pack-challenge/domain';
import { sql } from 'drizzle-orm';
import {
	bigint,
	check,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar
} from 'drizzle-orm/pg-core';

export const resourceCategoryEnum = pgEnum('resource_category', [...RESOURCE_CATEGORIES]);
export const resourceLanguageEnum = pgEnum('resource_language', [...RESOURCE_LANGUAGES]);
export const resourceProviderEnum = pgEnum('resource_provider', [...RESOURCE_PROVIDERS]);

export const resources = pgTable(
	'resources',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		title: varchar('title', { length: RESOURCE_TITLE_MAX }).notNull(),
		description: varchar('description', { length: RESOURCE_DESCRIPTION_MAX }).notNull(),
		category: resourceCategoryEnum('category').notNull(),
		language: resourceLanguageEnum('language').notNull(),
		provider: resourceProviderEnum('provider').notNull(),
		/** Pack roles multi-select (mentor-coach / mentee-coachee). */
		roles: text('roles').array().notNull(),
		fileOriginalName: varchar('file_original_name', { length: RESOURCE_FILE_NAME_MAX }).notNull(),
		fileMimeType: text('file_mime_type').notNull(),
		fileSize: bigint('file_size', { mode: 'number' }).notNull(),
		/** Internal object key / path — never expose as a public FS URL beyond resource id. */
		storagePath: text('storage_path').notNull().unique(),
		createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
			.defaultNow()
			.notNull()
	},
	(table) => [
		check(
			'resources_roles_nonempty',
			sql`cardinality(${table.roles}) >= 1`
		),
		check(
			'resources_file_size_range',
			sql`${table.fileSize} > 0 AND ${table.fileSize} <= ${sql.raw(String(RESOURCE_FILE_SIZE_MAX))}`
		)
	]
);

export type ResourceRow = typeof resources.$inferSelect;
export type NewResourceRow = typeof resources.$inferInsert;
