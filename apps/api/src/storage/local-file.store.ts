import { Injectable } from '@nestjs/common';
import { createReadStream } from 'node:fs';
import { access, mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { ResourceFileMimeType } from '@pack-challenge/domain';
import type { FileStore, OpenedObject, StoredObject } from './file-store.js';
import { buildResourceObjectKey, resolveStoragePath } from './object-key.js';

@Injectable()
export class LocalFileStore implements FileStore {
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
		return { storagePath };
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

	/**
	 * Open a stored object for reading. Returns `null` when the key is unsafe
	 * (traversal / absolute) or the file is missing — fail closed.
	 */
	async openReadStream(storagePath: string): Promise<OpenedObject | null> {
		const absolutePath = resolveStoragePath(this.root, storagePath);
		if (!absolutePath) {
			return null;
		}
		try {
			await access(absolutePath);
		} catch {
			return null;
		}
		return { stream: createReadStream(absolutePath) };
	}

	async delete(storagePath: string): Promise<void> {
		const absolutePath = resolveStoragePath(this.root, storagePath);
		if (!absolutePath) {
			return;
		}
		await unlink(absolutePath).catch(() => undefined);
	}

	/** Test helper: resolve the absolute path for a relative key. */
	resolveAbsolute(storagePath: string): string | null {
		return resolveStoragePath(this.root, storagePath);
	}
}
