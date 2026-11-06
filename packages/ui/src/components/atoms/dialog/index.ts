import Root from './dialog.svelte';
import Portal from './dialog-portal.svelte';
import Overlay from './dialog-overlay.svelte';
import Content from './dialog-content.svelte';
import Trigger from './dialog-trigger.svelte';
import Close from './dialog-close.svelte';
import Title from './dialog-title.svelte';
import Description from './dialog-description.svelte';
import Header from './dialog-header.svelte';
import Footer from './dialog-footer.svelte';

export {
	Root,
	Portal,
	Overlay,
	Content,
	Trigger,
	Close,
	Title,
	Description,
	Header,
	Footer,
	//
	Root as Dialog,
	Portal as DialogPortal,
	Overlay as DialogOverlay,
	Content as DialogContent,
	Trigger as DialogTrigger,
	Close as DialogClose,
	Title as DialogTitle,
	Description as DialogDescription,
	Header as DialogHeader,
	Footer as DialogFooter
};

export {
	dialogCloseBaseClass,
	dialogContentBaseClass,
	dialogDescriptionBaseClass,
	dialogFooterBaseClass,
	dialogHeaderBaseClass,
	dialogOverlayBaseClass,
	dialogTitleBaseClass,
	resolveDialogClose,
	resolveDialogContent,
	resolveDialogDescription,
	resolveDialogFooter,
	resolveDialogHeader,
	resolveDialogOverlay,
	resolveDialogTitle
} from './dialog.js';

export type {
	DialogCloseProps,
	DialogContentProps,
	DialogDescriptionProps,
	DialogFooterProps,
	DialogHeaderProps,
	DialogOverlayProps,
	DialogPortalProps,
	DialogRootProps,
	DialogTitleProps,
	DialogTriggerProps
} from './types.js';
