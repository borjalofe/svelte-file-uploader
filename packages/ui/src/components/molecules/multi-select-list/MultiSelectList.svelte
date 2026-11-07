<script lang="ts">
	import CheckIcon from '@lucide/svelte/icons/check';
	import { Checkbox } from 'bits-ui';
	import {
		ROLE_MULTI_OPTIONS,
		resolveMultiSelectListCheckbox,
		resolveMultiSelectListError,
		resolveMultiSelectListGroup,
		resolveMultiSelectListItem,
		resolveMultiSelectListRoot
	} from './multi-select-list.js';
	import type { MultiSelectListProps } from './types.js';

	let {
		ref = $bindable(null),
		value = $bindable<string[]>([]),
		label,
		id = 'multi-select-list',
		'aria-label': ariaLabel,
		disabled = false,
		invalid = false,
		error = 'Select at least one option',
		options = ROLE_MULTI_OPTIONS,
		class: className,
		...restProps
	}: MultiSelectListProps = $props();

	const root = $derived(resolveMultiSelectListRoot({ class: className }));
	const group = $derived(resolveMultiSelectListGroup());
	const item = $derived(resolveMultiSelectListItem());
	const checkbox = $derived(resolveMultiSelectListCheckbox());
	const errorClasses = $derived(resolveMultiSelectListError());
	const labelId = $derived(`${id}-label`);
	const errorId = $derived(`${id}-error`);
	const named = $derived(ariaLabel ?? label);
</script>

<div
	bind:this={ref}
	data-slot="multi-select-list"
	class={root.className}
	data-disabled={disabled ? 'true' : undefined}
	data-invalid={invalid ? 'true' : undefined}
	{...restProps}
>
	<span
		id={labelId}
		class="text-sm font-medium text-foreground"
		data-slot="multi-select-list-label"
	>
		{label}
	</span>

	<Checkbox.Group
		bind:value
		{disabled}
		class={group.className}
		aria-labelledby={labelId}
		aria-label={named}
		aria-invalid={invalid ? 'true' : undefined}
		aria-describedby={invalid ? errorId : undefined}
		data-slot="multi-select-list-group"
	>
		{#each options as option (option.value)}
			<label
				class={item.className}
				data-slot="multi-select-list-item"
				for={`${id}-${option.value}`}
			>
				<Checkbox.Root
					id={`${id}-${option.value}`}
					value={option.value}
					disabled={disabled || option.disabled}
					aria-invalid={invalid ? 'true' : undefined}
					class={checkbox.className}
					data-slot="multi-select-list-checkbox"
				>
					{#snippet children({ checked })}
						{#if checked}
							<CheckIcon class="size-3.5" />
						{/if}
					{/snippet}
				</Checkbox.Root>
				<span>{option.label}</span>
			</label>
		{/each}
	</Checkbox.Group>

	{#if invalid}
		<p id={errorId} class={errorClasses.className} role="alert" data-slot="multi-select-list-error">
			{error}
		</p>
	{/if}
</div>
