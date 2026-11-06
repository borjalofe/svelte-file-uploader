import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import StyleDictionary from 'style-dictionary';
import { distDir, themeCssPath, tokensDir } from './paths.js';
import { validateTokensDir } from './validate.js';

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
        transformGroup: 'css',
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
