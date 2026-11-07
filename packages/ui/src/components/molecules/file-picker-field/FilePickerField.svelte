<script lang="ts">
	import { Button } from '../../atoms/button/index.js';
	import { Input } from '../../atoms/input/index.js';
	import { Label } from '../../atoms/label/index.js';
	import { SR_ONLY_CLASS } from '../../particles/visually-hidden/index.js';
	import { cn } from '../../../lib/utils.js';
	import {
		resolveFilePickerFieldControls,
		resolveFilePickerFieldError,
		resolveFilePickerFieldRoot
	} from './file-picker-field.js';
	import type { FilePickerFieldProps } from './types.js';

	let {
		ref = $bindable(null),
		filename = $bindable(''),
		files = $bindable<FileList | undefined>(undefined),
		label = 'File',
		inputId = 'file-picker-field',
		'aria-label': ariaLabel,
		labelVisuallyHidden = false,
		placeholder = 'No file selected',
		buttonLabel = 'Select file',
		disabled = false,
		invalid = false,
		error = 'Choose a file',
		accept,
		multiple = false,
		class: className,
		inputClass,
		name,
		required,
		...restProps
	}: FilePickerFieldProps = $props();

	let fileInput = $state<HTMLInputElement | null>(null);

	const root = $derived(resolveFilePickerFieldRoot({ class: className }));
	const controls = $derived(resolveFilePickerFieldControls());
	const errorClasses = $derived(resolveFilePickerFieldError());
	const errorId = $derived(`${inputId}-error`);
	const named = $derived(ariaLabel ?? label);
	const fileInputId = $derived(`${inputId}-file`);

	function openPicker() {
		if (disabled) return;
		fileInput?.click();
	}

	function onFileChange(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		files = input.files ?? undefined;
		filename = input.files?.[0]?.name ?? '';
	}
</script>

<div
	bind:this={ref}
	data-slot="file-picker-field"
	class={root.className}
	data-disabled={disabled ? 'true' : undefined}
	data-invalid={invalid ? 'true' : undefined}
	{...restProps}
>
	<Label for={inputId} class={labelVisuallyHidden ? SR_ONLY_CLASS : undefined}>{label}</Label>
	<div class={controls.className} data-slot="file-picker-field-controls">
		<Input
			id={inputId}
			class={cn(inputClass)}
			type="text"
			readonly
			tabindex={-1}
			value={filename}
			{placeholder}
			{disabled}
			aria-label={named}
			aria-invalid={invalid ? 'true' : undefined}
			aria-describedby={invalid ? errorId : undefined}
			data-slot="file-picker-field-filename"
		/>
		<Button
			type="button"
			variant="secondary"
			{disabled}
			onclick={openPicker}
			aria-controls={fileInputId}
			data-slot="file-picker-field-button"
		>
			{buttonLabel}
		</Button>
	</div>
	<input
		bind:this={fileInput}
		id={fileInputId}
		class={SR_ONLY_CLASS}
		type="file"
		{accept}
		{multiple}
		{disabled}
		{name}
		{required}
		tabindex={-1}
		aria-hidden="true"
		data-slot="file-picker-field-input"
		onchange={onFileChange}
	/>
	{#if invalid}
		<p id={errorId} class={errorClasses.className} role="alert" data-slot="file-picker-field-error">
			{error}
		</p>
	{/if}
</div>
