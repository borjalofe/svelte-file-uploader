import { describe, expect, it } from 'vitest';
import {
	inputFieldErrorClass,
	inputFieldHintClass,
	resolveInputFieldError,
	resolveInputFieldHint,
	resolveInputFieldIds
} from './input-field.js';

describe('InputField molecule (#43)', () => {
	it('wires hint describedby when there is no error', () => {
		const ids = resolveInputFieldIds({ id: 'title', hint: 'Visible to learners' });
		expect(ids.controlId).toBe('title');
		expect(ids.hintId).toBe('title-hint');
		expect(ids.describedBy).toBe('title-hint');
	});

	it('prefers error describedby over hint', () => {
		const ids = resolveInputFieldIds({
			id: 'title',
			hint: 'Optional hint',
			error: 'Title is required'
		});
		expect(ids.describedBy).toBe('title-error');
		expect(ids.errorId).toBe('title-error');
	});

	it('omits describedby when neither hint nor error is set', () => {
		expect(resolveInputFieldIds({ id: 'notes' }).describedBy).toBeUndefined();
	});

	it('uses semantic hint/error text tokens (no raw hex)', () => {
		expect(resolveInputFieldHint().className).toContain('text-muted-foreground');
		expect(resolveInputFieldError().className).toContain('text-destructive');
		expect(inputFieldHintClass).toContain('text-sm');
		expect(inputFieldErrorClass).not.toMatch(/#[0-9a-fA-F]{3,8}/);
		expect(resolveInputFieldHint({ class: 'mt-1' }).className).toContain('mt-1');
	});
});
