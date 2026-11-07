import { describe, expect, it } from 'vitest';
import {
	RESOURCE_ROLES,
	packageName,
	resourceCreateSchema,
	resourceRoleSchema
} from './index.js';

describe('@pack-challenge/domain', () => {
	it('boots and exports packageName', () => {
		expect(packageName()).toBe('@pack-challenge/domain');
	});

	it('re-exports Resource schemas from the package root', () => {
		expect(RESOURCE_ROLES).toContain('mentor-coach');
		expect(resourceRoleSchema.parse('mentee-coachee')).toBe('mentee-coachee');
		expect(
			resourceCreateSchema.safeParse({
				title: 'T',
				description: 'D',
				category: 'leadership',
				language: 'en',
				provider: 'pack',
				roles: ['mentor-coach'],
				file: {
					originalName: 'a.pdf',
					mimeType: 'application/pdf',
					size: 10
				}
			}).success
		).toBe(true);
	});
});
