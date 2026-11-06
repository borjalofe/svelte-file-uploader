import Root from './avatar.svelte';
import Image from './avatar-image.svelte';
import Fallback from './avatar-fallback.svelte';

export {
	Root,
	Image,
	Fallback,
	//
	Root as Avatar,
	Image as AvatarImage,
	Fallback as AvatarFallback
};

export {
	avatarFallbackBaseClass,
	avatarImageBaseClass,
	avatarRootBaseClass,
	resolveAvatarFallback,
	resolveAvatarImage,
	resolveAvatarRoot
} from './avatar.js';

export type { AvatarFallbackProps, AvatarImageProps, AvatarRootProps } from './types.js';
