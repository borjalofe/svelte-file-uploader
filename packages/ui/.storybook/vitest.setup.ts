import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/sveltekit';
import * as projectAnnotations from './preview';

// Wire axe into Vitest/Storybook portable stories (required for CLI/CI a11y failures).
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
