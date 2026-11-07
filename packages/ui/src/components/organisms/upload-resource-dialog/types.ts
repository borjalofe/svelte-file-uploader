import type { SelectFieldOption } from '../../molecules/select-field/types.js';

/** Values emitted on Upload (no network — parent handles persistence). */
export type UploadResourcePayload = {
	title: string;
	description: string;
	category: string | undefined;
	language: string | undefined;
	provider: string | undefined;
	roles: string[];
	filename: string;
	files: FileList | undefined;
};

export type UploadResourceDialogProps = {
	/** Controls dialog visibility. */
	open?: boolean;
	/** Dialog heading. */
	dialogTitle?: string;
	/** Optional dialog description under the title. */
	dialogDescription?: string;
	title?: string;
	description?: string;
	category?: string;
	language?: string;
	provider?: string;
	roles?: string[];
	filename?: string;
	files?: FileList;
	categoryOptions?: readonly SelectFieldOption[];
	languageOptions?: readonly SelectFieldOption[];
	providerOptions?: readonly SelectFieldOption[];
	uploadLabel?: string;
	triggerLabel?: string;
	disabled?: boolean;
	/** Fired with the current form values (mock — no upload API). */
	onUpload?: (payload: UploadResourcePayload) => void;
	/** Extra classes on the form Stack. */
	class?: string;
	/** Extra classes on DialogContent. */
	contentClass?: string;
};
