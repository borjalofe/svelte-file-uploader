import { describe, expect, it } from 'vitest';
import type { Resource } from '@pack-challenge/domain';
import { mapResourceToTableRow, mimeToResourceContentType } from './map-resource-row.js';

const base: Resource = {
	id: '11111111-1111-4111-8111-111111111111',
	title: 'Conflict Resolution Basics',
	description: 'A short introduction.',
	category: 'conflict-resolution',
	language: 'en',
	provider: 'pack',
	roles: ['mentor-coach'],
	file: {
		originalName: 'conflict-basics.pdf',
		mimeType: 'application/pdf',
		size: 1024
	},
	storagePath: 'resources/abc.pdf',
	createdAt: new Date('2026-11-07T00:00:00.000Z'),
	updatedAt: new Date('2026-11-07T00:00:00.000Z')
};

describe('mapResourceToTableRow (#75)', () => {
	it('maps MIME videos vs documents and keeps storagePath off the table path', () => {
		expect(mimeToResourceContentType('video/mp4')).toBe('videos');
		expect(mimeToResourceContentType('application/pdf')).toBe('documents');

		const row = mapResourceToTableRow(base);
		expect(row.path).toBe('conflict-basics.pdf');
		expect(row.path).not.toContain('resources/');
		expect(row.type).toBe('documents');
		expect(row.provider).toBe('Pack');
		expect(row.viewCount).toBe(0);
		expect(row.uploadedBy).toBe('—');
	});

	it('maps video resources to the videos tab type', () => {
		const row = mapResourceToTableRow({
			...base,
			file: { ...base.file, mimeType: 'video/webm', originalName: 'clip.webm' }
		});
		expect(row.type).toBe('videos');
	});
});
