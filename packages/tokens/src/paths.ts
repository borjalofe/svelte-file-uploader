import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));

/** Repo-root `tokens/` DTCG sources. */
export const tokensDir = path.resolve(here, '../../../tokens');

/** Emitted CSS (gitignored) — CI proves theme emit succeeds. */
export const distDir = path.resolve(here, '../dist');
export const themeCssPath = path.join(distDir, 'theme.css');
