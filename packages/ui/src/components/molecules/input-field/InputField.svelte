<script lang="ts">
	import { Input } from '../../atoms/input/index.js';
	import { Label } from '../../atoms/label/index.js';
	import { Textarea } from '../../atoms/textarea/index.js';
	import { Stack } from '../../particles/stack/index.js';
	import {
		inputFieldRequiredMarkClass,
		resolveInputFieldError,
		resolveInputFieldHint,
		resolveInputFieldIds
	} from './input-field.js';
	import type { InputFieldProps } from './types.js';

	let {
		label,
		id,
		required = false,
		hint,
		error,
		control = 'input',
		class: className,
		value = $bindable(''),
		disabled = false,
		placeholder,
		name,
		type = 'text',
		rows,
		autocomplete
	}: InputFieldProps = $props();

	const ids = $derived(resolveInputFieldIds({ id, hint, error }));
	const hintResolved = $derived(resolveInputFieldHint());
	const errorResolved = $derived(resolveInputFieldError());
	const invalid = $derived(Boolean(error));
</script>

<Stack direction="column" gap="2" class={className} data-slot="input-field">
	<Label for={ids.controlId}>
		{label}
		{#if required}
			<span class={inputFieldRequiredMarkClass} aria-hidden="true">*</span>
		{/if}
	</Label>

	{#if control === 'textarea'}
		<Textarea
			id={ids.controlId}
			bind:value
			{disabled}
			{placeholder}
			{name}
			{rows}
			aria-invalid={invalid ? 'true' : undefined}
			aria-required={required ? 'true' : undefined}
			aria-describedby={ids.describedBy}
		/>
	{:else}
		<Input
			id={ids.controlId}
			bind:value
			{disabled}
			{placeholder}
			{name}
			{type}
			{autocomplete}
			aria-invalid={invalid ? 'true' : undefined}
			aria-required={required ? 'true' : undefined}
			aria-describedby={ids.describedBy}
		/>
	{/if}

	{#if error}
		<p id={ids.errorId} class={errorResolved.className} role="alert" data-slot="input-field-error">
			{error}
		</p>
	{:else if hint}
		<p id={ids.hintId} class={hintResolved.className} data-slot="input-field-hint">
			{hint}
		</p>
	{/if}
</Stack>
