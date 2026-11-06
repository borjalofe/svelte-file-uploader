import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../../lib/utils.js';

export type CardRootProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
export type CardHeaderProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
export type CardTitleProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
export type CardDescriptionProps = WithElementRef<HTMLAttributes<HTMLParagraphElement>>;
export type CardActionProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
export type CardContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
export type CardFooterProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
