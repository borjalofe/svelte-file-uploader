import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import StyleDictionary from 'style-dictionary';
import { distDir, themeCssPath, tokensDir } from './paths.js';
import { validateTokensDir } from './validate.js';

/** Map token paths to CSS custom property names (shadcn short names for semantic.*). */
export function cssVariableName(path: string[]): string {
  if (path[0] !== 'semantic') {
    return path.join('-');
  }

  const [, category, ...rest] = path;
  if (category === 'color') {
    return rest.join('-');
  }
  if (category === 'radius') {
    return 'radius';
  }
  if (category === 'font') {
    return ['font', ...rest].join('-');
  }
  return path.slice(1).join('-');
}

StyleDictionary.registerTransform({
  name: 'name/pack',
  type: 'name',
  transform: (token) => cssVariableName(token.path.map(String))
});

const cssTransforms = StyleDictionary.hooks.transformGroups.css.map((name) =>
  name === 'name/kebab' ? 'name/pack' : name
);

export async function buildTheme(): Promise<void> {
  const validation = validateTokensDir();
  if (!validation.ok) {
    const detail = validation.errors.map((e) => ` - ${e}`).join('\n');
    throw new Error(`Refusing to emit theme; token validation failed:\n${detail}`);
  }

  fs.mkdirSync(distDir, { recursive: true });

  const sd = new StyleDictionary({
    source: [`${tokensDir}/**/*.json`],
    platforms: {
      css: {
        transforms: cssTransforms,
        buildPath: `${distDir}/`,
        files: [
          {
            destination: 'theme.css',
            format: 'css/variables',
            options: {
              outputReferences: true
            }
          }
        ]
      }
    }
  });

  await sd.hasInitialized;
  await sd.buildAllPlatforms();

  if (!fs.existsSync(themeCssPath)) {
    throw new Error(`Theme emit failed: missing ${themeCssPath}`);
  }

  console.log(`Theme emitted → ${themeCssPath}`);
}

async function main(): Promise<void> {
  try {
    await buildTheme();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  void main();
}
