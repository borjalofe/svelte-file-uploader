import type { Select as SelectPrimitive, Separator as SeparatorPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef, WithoutChild, WithoutChildrenOrChild } from '../../../lib/utils.js';

export type SelectRootProps = SelectPrimitive.RootProps;
export type SelectTriggerProps = WithoutChild<SelectPrimitive.TriggerProps> & {
	size?: 'sm' | 'default';
};
export type SelectContentProps = WithoutChild<SelectPrimitive.ContentProps> & {
	portalProps?: WithoutChildrenOrChild<SelectPrimitive.PortalProps>;
};
export type SelectItemProps = WithoutChild<SelectPrimitive.ItemProps>;
export type SelectGroupProps = SelectPrimitive.GroupProps;
export type SelectGroupHeadingProps = ComponentProps<typeof SelectPrimitive.GroupHeading>;
export type SelectLabelProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
export type SelectSeparatorProps = SeparatorPrimitive.RootProps;
export type SelectPortalProps = SelectPrimitive.PortalProps;
export type SelectScrollUpButtonProps = WithoutChildrenOrChild<SelectPrimitive.ScrollUpButtonProps>;
export type SelectScrollDownButtonProps =
	WithoutChildrenOrChild<SelectPrimitive.ScrollDownButtonProps>;
export type SelectValueProps = SelectPrimitive.ValueProps;
