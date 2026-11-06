import { describe, expect, it } from 'vitest';
import { apiStub } from './main.js';

describe('@pack-challenge/api', () => {
	it('boots the Nest stub entry', () => {
		expect(apiStub()).toBe('@pack-challenge/api');
	});
});
