import { type ClassValue, cn } from '../../../lib/utils.js';
import type { SelectFieldOption } from '../../molecules/select-field/types.js';

/**
 * Pack UploadResourceDialog — Dialog + stacked Upload Resource fields.
 * Focus trap comes from bits-ui Dialog.Content (`trapFocus` default true).
 */
export const uploadResourceDialogFormBaseClass = 'w-full min-w-0';

/** English demo Category options (Upload Resource). */
export const UPLOAD_CATEGORY_OPTIONS: readonly SelectFieldOption[] = [
	{ value: 'conflict-resolution', label: 'Conflict Resolution' },
	{ value: 'leadership', label: 'Leadership' },
	{ value: 'communication', label: 'Communication' }
];

/** English demo Language options. */
export const UPLOAD_LANGUAGE_OPTIONS: readonly SelectFieldOption[] = [
	{ value: 'en', label: 'English' },
	{ value: 'es', label: 'Spanish' },
	{ value: 'fr', label: 'French' }
];

/** English demo Provider options. */
export const UPLOAD_PROVIDER_OPTIONS: readonly SelectFieldOption[] = [
	{ value: 'pack', label: 'Pack' },
	{ value: 'partner', label: 'Partner' }
];

export function resolveUploadResourceDialogForm({
	class: className
}: { class?: ClassValue } = {}): { className: string } {
	return { className: cn(uploadResourceDialogFormBaseClass, className) };
}
