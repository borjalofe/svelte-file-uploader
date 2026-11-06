import type { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import type { ComponentProps, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef, WithoutChild, WithoutChildrenOrChild } from '../../../lib/utils.js';

export type DropdownMenuRootProps = DropdownMenuPrimitive.RootProps;
export type DropdownMenuTriggerProps = DropdownMenuPrimitive.TriggerProps;
export type DropdownMenuPortalProps = DropdownMenuPrimitive.PortalProps;
export type DropdownMenuContentProps = DropdownMenuPrimitive.ContentProps & {
	portalProps?: WithoutChildrenOrChild<DropdownMenuPrimitive.PortalProps>;
};
export type DropdownMenuItemProps = DropdownMenuPrimitive.ItemProps & {
	inset?: boolean;
	variant?: 'default' | 'destructive';
};
export type DropdownMenuGroupProps = DropdownMenuPrimitive.GroupProps;
export type DropdownMenuGroupHeadingProps = ComponentProps<
	typeof DropdownMenuPrimitive.GroupHeading
> & {
	inset?: boolean;
};
export type DropdownMenuLabelProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
	inset?: boolean;
};
export type DropdownMenuSeparatorProps = DropdownMenuPrimitive.SeparatorProps;
export type DropdownMenuShortcutProps = WithElementRef<HTMLAttributes<HTMLSpanElement>>;
export type DropdownMenuCheckboxGroupProps = DropdownMenuPrimitive.CheckboxGroupProps;
export type DropdownMenuCheckboxItemProps =
	WithoutChildrenOrChild<DropdownMenuPrimitive.CheckboxItemProps> & {
		children?: Snippet;
	};
export type DropdownMenuRadioGroupProps = DropdownMenuPrimitive.RadioGroupProps;
export type DropdownMenuRadioItemProps = WithoutChild<DropdownMenuPrimitive.RadioItemProps>;
export type DropdownMenuSubProps = DropdownMenuPrimitive.SubProps;
export type DropdownMenuSubTriggerProps = DropdownMenuPrimitive.SubTriggerProps & {
	inset?: boolean;
};
export type DropdownMenuSubContentProps = DropdownMenuPrimitive.SubContentProps;
