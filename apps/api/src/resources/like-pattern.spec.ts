import { describe, expect, it } from 'vitest';
import { toIlikeSubstring } from './like-pattern.js';

describe('toIlikeSubstring (#71)', () => {
	it('wraps the query and escapes LIKE metacharacters', () => {
		expect(toIlikeSubstring('a%b_c\\d')).toBe('%a\\%b\\_c\\\\d%');
	});
});
