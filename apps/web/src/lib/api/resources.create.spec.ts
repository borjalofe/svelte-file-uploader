import { describe, expect, it, vi } from 'vitest';
import { ApiError, createResource, formatApiError } from './resources.js';

describe('createResource (#76)', () => {
	it('POSTs multipart fields and returns the created resource', async () => {
		const fetchImpl = vi.fn(async (_url: URL | RequestInfo, init?: RequestInit) => {
			expect(init?.method).toBe('POST');
			expect(init?.body).toBeInstanceOf(FormData);
			const body = init!.body as FormData;
			expect(body.get('title')).toBe('Conflict Basics');
			expect(body.get('roles')).toBe(JSON.stringify(['mentor-coach']));
			expect(body.get('file')).toBeInstanceOf(File);

			return new Response(
				JSON.stringify({
					id: '550e8400-e29b-41d4-a716-446655440000',
					title: 'Conflict Basics',
					description: 'Intro',
					category: 'conflict-resolution',
					language: 'en',
					provider: 'pack',
					roles: ['mentor-coach'],
					file: {
						originalName: 'guide.pdf',
						mimeType: 'application/pdf',
						size: 12
					},
					storagePath: 'resources/550e8400-e29b-41d4-a716-446655440000.pdf',
					createdAt: '2026-11-07T12:00:00.000Z',
					updatedAt: '2026-11-07T12:00:00.000Z'
				}),
				{ status: 201, headers: { 'content-type': 'application/json' } }
			);
		});

		const created = await createResource(
			{
				title: 'Conflict Basics',
				description: 'Intro',
				category: 'conflict-resolution',
				language: 'en',
				provider: 'pack',
				roles: ['mentor-coach'],
				file: new File(['%PDF'], 'guide.pdf', { type: 'application/pdf' })
			},
			fetchImpl as unknown as typeof fetch
		);

		expect(created.id).toBe('550e8400-e29b-41d4-a716-446655440000');
		expect(created.file.originalName).toBe('guide.pdf');
	});

	it('surfaces Nest validation issues', async () => {
		const fetchImpl = vi.fn(
			async () =>
				new Response(
					JSON.stringify({
						message: 'Validation failed',
						issues: [{ path: 'title', message: 'Title is required' }]
					}),
					{ status: 400, headers: { 'content-type': 'application/json' } }
				)
		);

		await expect(
			createResource(
				{
					title: '',
					description: 'x',
					category: 'leadership',
					language: 'en',
					provider: 'pack',
					roles: ['mentor-coach'],
					file: new File(['a'], 'a.pdf', { type: 'application/pdf' })
				},
				fetchImpl as unknown as typeof fetch
			)
		).rejects.toMatchObject({
			name: 'ApiError',
			status: 400,
			issues: [{ path: 'title', message: 'Title is required' }]
		});
	});
});

describe('formatApiError (#76)', () => {
	it('joins Nest issue messages', () => {
		expect(
			formatApiError(
				new ApiError('Validation failed', 400, [
					{ path: 'title', message: 'Title is required' },
					{ path: 'file', message: 'File is required' }
				])
			)
		).toBe('Title is required; File is required');
	});
});
