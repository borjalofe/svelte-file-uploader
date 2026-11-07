import { describe, expect, it } from 'vitest';
import {
	RESOURCE_DESCRIPTION_MAX,
	RESOURCE_FILE_SIZE_MAX,
	RESOURCE_ROLES,
	RESOURCE_TITLE_MAX
} from './constants.js';
import {
	resourceCreateSchema,
	resourceListQuerySchema,
	resourceListSchema,
	resourceSchema
} from './resource.schemas.js';

const validCreate = {
	title: 'Conflict Resolution Basics',
	description: 'A short introduction to resolving workplace conflict.',
	category: 'conflict-resolution' as const,
	language: 'en' as const,
	provider: 'pack' as const,
	roles: ['mentor-coach'] as const,
	file: {
		originalName: 'conflict-basics.pdf',
		mimeType: 'application/pdf' as const,
		size: 1024
	}
};

describe('resourceCreateSchema (#67)', () => {
	it('accepts a valid create payload', () => {
		const parsed = resourceCreateSchema.parse(validCreate);
		expect(parsed.title).toBe(validCreate.title);
		expect(parsed.roles).toEqual(['mentor-coach']);
		expect(parsed.file.size).toBe(1024);
	});

	it('rejects title over 200 characters', () => {
		const result = resourceCreateSchema.safeParse({
			...validCreate,
			title: 'x'.repeat(RESOURCE_TITLE_MAX + 1)
		});
		expect(result.success).toBe(false);
	});

	it('rejects description over 1000 characters', () => {
		const result = resourceCreateSchema.safeParse({
			...validCreate,
			description: 'y'.repeat(RESOURCE_DESCRIPTION_MAX + 1)
		});
		expect(result.success).toBe(false);
	});

	it('requires at least one Pack role and dedupes', () => {
		expect(resourceCreateSchema.safeParse({ ...validCreate, roles: [] }).success).toBe(false);
		expect(
			resourceCreateSchema.safeParse({ ...validCreate, roles: ['unknown'] }).success
		).toBe(false);

		const parsed = resourceCreateSchema.parse({
			...validCreate,
			roles: ['mentor-coach', 'mentee-coachee', 'mentor-coach']
		});
		expect(parsed.roles).toEqual([...RESOURCE_ROLES]);
	});

	it('enforces file metadata mime and size caps', () => {
		expect(
			resourceCreateSchema.safeParse({
				...validCreate,
				file: { ...validCreate.file, mimeType: 'application/zip' }
			}).success
		).toBe(false);

		expect(
			resourceCreateSchema.safeParse({
				...validCreate,
				file: { ...validCreate.file, size: RESOURCE_FILE_SIZE_MAX + 1 }
			}).success
		).toBe(false);

		expect(
			resourceCreateSchema.safeParse({
				...validCreate,
				file: { ...validCreate.file, size: 0 }
			}).success
		).toBe(false);
	});
});

describe('resourceSchema + list (#67)', () => {
	it('accepts a stored resource with file pointer and timestamps', () => {
		const resource = resourceSchema.parse({
			...validCreate,
			id: '550e8400-e29b-41d4-a716-446655440000',
			storagePath: 'resources/550e8400-e29b-41d4-a716-446655440000.pdf',
			createdAt: '2026-11-07T12:00:00.000Z',
			updatedAt: '2026-11-07T12:00:00.000Z'
		});
		expect(resource.id).toBe('550e8400-e29b-41d4-a716-446655440000');
		expect(resource.createdAt).toBeInstanceOf(Date);
	});

	it('parses list query defaults and optional filters', () => {
		expect(resourceListQuerySchema.parse({})).toEqual({ limit: 20, offset: 0 });
		expect(
			resourceListQuerySchema.parse({
				q: ' conflict ',
				category: 'leadership',
				limit: '10',
				offset: '5'
			})
		).toMatchObject({
			q: 'conflict',
			category: 'leadership',
			limit: 10,
			offset: 5
		});
	});

	it('accepts a list envelope', () => {
		const list = resourceListSchema.parse({
			items: [
				{
					...validCreate,
					id: '550e8400-e29b-41d4-a716-446655440000',
					storagePath: 'resources/x.pdf',
					createdAt: new Date('2026-11-07T12:00:00.000Z'),
					updatedAt: new Date('2026-11-07T12:00:00.000Z')
				}
			],
			total: 1,
			limit: 20,
			offset: 0
		});
		expect(list.items).toHaveLength(1);
		expect(list.total).toBe(1);
	});
});
