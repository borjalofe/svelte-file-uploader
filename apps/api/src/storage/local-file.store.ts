import { Injectable } from '@nestjs/common';
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import type { ResourceFileMimeType } from '@pack-challenge/domain';
import { buildResourceObjectKey, resolveStoragePath } from './object-key.js';

export type StoredObject = {
	/** Relative key persisted as `storagePath` (e.g. `resources/<uuid>.pdf`). */
	storagePath: string;
	absolutePath: string;
};

@Injectable()
export class LocalFileStore {
	constructor(private readonly root: string) {}

	getRoot(): string {
		return this.root;
	}

	async writeResourceFile(
		mimeType: ResourceFileMimeType,
		bytes: Buffer
	): Promise<StoredObject> {
		const storagePath = buildResourceObjectKey(mimeType);
		const absolutePath = resolveStoragePath(this.root, storagePath);
		if (!absolutePath) {
			throw new Error('Refusing to write outside the file storage root');
		}

		await mkdir(path.dirname(absolutePath), { recursive: true });
		await writeFile(absolutePath, bytes, { flag: 'wx' });
		return { storagePath, absolutePath };
	}

	async exists(storagePath: string): Promise<boolean> {
		const absolutePath = resolveStoragePath(this.root, storagePath);
		if (!absolutePath) {
			return false;
		}
		try {
			await access(absolutePath);
			return true;
		} catch {
			return false;
		}
	}
}
