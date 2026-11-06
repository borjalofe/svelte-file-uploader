import { describe, expect, it } from 'vitest';
import { packageName } from './package-name';

describe('@pack-challenge/ui', () => {
	it('boots and exports packageName', () => {
		expect(packageName()).toBe('@pack-challenge/ui');
	});
});
