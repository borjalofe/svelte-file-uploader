<script lang="ts">
	import { Label } from '../../atoms/label/index.js';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
		SelectValue
	} from '../../atoms/select/index.js';
	import { SR_ONLY_CLASS } from '../../particles/visually-hidden/index.js';
	import { resolveSelectFieldError, resolveSelectFieldRoot } from './select-field.js';
	import type { SelectFieldProps } from './types.js';

	let {
		ref = $bindable(null),
		value = $bindable<string | undefined>(undefined),
		label,
		triggerId = 'select-field',
		'aria-label': ariaLabel,
		labelVisuallyHidden = false,
		placeholder = 'Select an option',
		disabled = false,
		invalid = false,
		error = 'This field is required',
		options = [],
		class: className,
		triggerClass,
		...restProps
	}: SelectFieldProps = $props();

	const root = $derived(resolveSelectFieldRoot({ class: className }));
	const errorClasses = $derived(resolveSelectFieldError());
	const errorId = $derived(`${triggerId}-error`);
	const named = $derived(ariaLabel ?? label);
</script>

<div
	bind:this={ref}
	data-slot="select-field"
	class={root.className}
	data-disabled={disabled ? 'true' : undefined}
	data-invalid={invalid ? 'true' : undefined}
	{...restProps}
>
	<Label for={triggerId} class={labelVisuallyHidden ? SR_ONLY_CLASS : undefined}>{label}</Label>
	<Select type="single" bind:value>
		<SelectTrigger
			id={triggerId}
			class={['w-full', triggerClass]}
			{disabled}
			aria-label={named}
			aria-invalid={invalid ? 'true' : undefined}
			aria-describedby={invalid ? errorId : undefined}
			data-slot="select-field-trigger"
		>
			<SelectValue {placeholder} />
		</SelectTrigger>
		<SelectContent>
			{#each options as option (option.value)}
				<SelectItem value={option.value} label={option.label} disabled={option.disabled} />
			{/each}
		</SelectContent>
	</Select>
	{#if invalid}
		<p id={errorId} class={errorClasses.className} role="alert" data-slot="select-field-error">
			{error}
		</p>
	{/if}
</div>
