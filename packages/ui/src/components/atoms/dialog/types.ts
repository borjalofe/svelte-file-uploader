import type { Dialog as DialogPrimitive } from 'bits-ui';
import type { ComponentProps, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef, WithoutChildrenOrChild } from '../../../lib/utils.js';

export type DialogRootProps = DialogPrimitive.RootProps;
export type DialogTriggerProps = DialogPrimitive.TriggerProps;
export type DialogCloseProps = DialogPrimitive.CloseProps;
export type DialogPortalProps = DialogPrimitive.PortalProps;
export type DialogOverlayProps = DialogPrimitive.OverlayProps;
export type DialogTitleProps = DialogPrimitive.TitleProps;
export type DialogDescriptionProps = DialogPrimitive.DescriptionProps;

export type DialogContentProps = WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
	portalProps?: WithoutChildrenOrChild<DialogPrimitive.PortalProps>;
	children: Snippet;
	showCloseButton?: boolean;
};

export type DialogHeaderProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
export type DialogFooterProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
	showCloseButton?: boolean;
};

/** Re-export portal props helper for Content consumers. */
export type DialogPortalComponentProps = ComponentProps<typeof DialogPrimitive.Portal>;
