<script lang="ts">
	import { Button } from '../../atoms/button/index.js';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '../../atoms/dialog/index.js';
	import { FilePickerField } from '../../molecules/file-picker-field/index.js';
	import { InputField } from '../../molecules/input-field/index.js';
	import { MultiSelectList, ROLE_MULTI_OPTIONS } from '../../molecules/multi-select-list/index.js';
	import { SelectField } from '../../molecules/select-field/index.js';
	import { Stack } from '../../particles/stack/index.js';
	import {
		UPLOAD_CATEGORY_OPTIONS,
		UPLOAD_LANGUAGE_OPTIONS,
		UPLOAD_PROVIDER_OPTIONS,
		resolveUploadResourceDialogForm
	} from './upload-resource-dialog.js';
	import type { UploadResourceDialogProps, UploadResourcePayload } from './types.js';

	let {
		open = $bindable(false),
		dialogTitle = 'Upload Resource',
		dialogDescription = 'Add a new resource to the library.',
		title = $bindable(''),
		description = $bindable(''),
		category = $bindable<string | undefined>(undefined),
		language = $bindable<string | undefined>(undefined),
		provider = $bindable<string | undefined>(undefined),
		roles = $bindable<string[]>([]),
		filename = $bindable(''),
		files = $bindable<FileList | undefined>(undefined),
		categoryOptions = UPLOAD_CATEGORY_OPTIONS,
		languageOptions = UPLOAD_LANGUAGE_OPTIONS,
		providerOptions = UPLOAD_PROVIDER_OPTIONS,
		uploadLabel = 'Upload',
		triggerLabel = 'Upload',
		showTrigger = true,
		disabled = false,
		onUpload,
		class: className,
		contentClass
	}: UploadResourceDialogProps = $props();

	const form = $derived(resolveUploadResourceDialogForm({ class: className }));

	function handleUpload() {
		const payload: UploadResourcePayload = {
			title,
			description,
			category,
			language,
			provider,
			roles,
			filename,
			files
		};
		onUpload?.(payload);
	}
</script>

<Dialog bind:open>
	{#if showTrigger}
		<DialogTrigger>
			{#snippet child({ props })}
				<Button variant="default" type="button" {disabled} {...props}>{triggerLabel}</Button>
			{/snippet}
		</DialogTrigger>
	{/if}
	<DialogContent class={contentClass} data-slot="upload-resource-dialog">
		<DialogHeader>
			<DialogTitle>{dialogTitle}</DialogTitle>
			{#if dialogDescription}
				<DialogDescription>{dialogDescription}</DialogDescription>
			{/if}
		</DialogHeader>

		<Stack
			direction="column"
			gap="4"
			class={form.className}
			data-slot="upload-resource-dialog-form"
		>
			<InputField
				label="Title"
				id="upload-resource-title"
				bind:value={title}
				required
				{disabled}
				placeholder="Title"
			/>
			<InputField
				label="Description"
				id="upload-resource-description"
				control="textarea"
				bind:value={description}
				required
				{disabled}
				placeholder="Description"
				rows={3}
			/>
			<SelectField
				label="Category"
				triggerId="upload-resource-category"
				bind:value={category}
				options={[...categoryOptions]}
				{disabled}
				placeholder="Select category"
			/>
			<SelectField
				label="Language"
				triggerId="upload-resource-language"
				bind:value={language}
				options={[...languageOptions]}
				{disabled}
				placeholder="Select language"
			/>
			<SelectField
				label="Provider"
				triggerId="upload-resource-provider"
				bind:value={provider}
				options={[...providerOptions]}
				{disabled}
				placeholder="Select provider"
			/>
			<MultiSelectList
				label="Role"
				id="upload-resource-role"
				bind:value={roles}
				options={ROLE_MULTI_OPTIONS}
				{disabled}
			/>
			<FilePickerField
				label="File"
				inputId="upload-resource-file"
				bind:filename
				bind:files
				required
				{disabled}
			/>
		</Stack>

		<DialogFooter>
			<Button
				variant="default"
				type="button"
				{disabled}
				onclick={handleUpload}
				data-slot="upload-resource-dialog-upload"
			>
				{uploadLabel}
			</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
