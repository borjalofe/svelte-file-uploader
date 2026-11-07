import { Logger } from '@nestjs/common';
import type { ResourceFileMimeType } from '@pack-challenge/domain';
import type { FileStore, OpenedObject, StoredObject } from './file-store.js';

/**
 * Prefer `primary` (cloud); on write failure store on `secondary` (local).
 * Reads check primary first, then secondary — so fallback objects remain reachable.
 */
export class FallbackFileStore implements FileStore {
	private readonly logger = new Logger(FallbackFileStore.name);

	constructor(
		private readonly primary: FileStore,
		private readonly secondary: FileStore
	) {}

	async writeResourceFile(
		mimeType: ResourceFileMimeType,
		bytes: Buffer
	): Promise<StoredObject> {
		try {
			return await this.primary.writeResourceFile(mimeType, bytes);
		} catch (error) {
			this.logger.warn(
				`Primary store write failed; falling back to local: ${
					error instanceof Error ? error.message : String(error)
				}`
			);
			return this.secondary.writeResourceFile(mimeType, bytes);
		}
	}

	async exists(storagePath: string): Promise<boolean> {
		if (await this.primary.exists(storagePath)) {
			return true;
		}
		return this.secondary.exists(storagePath);
	}

	async openReadStream(storagePath: string): Promise<OpenedObject | null> {
		const fromPrimary = await this.primary.openReadStream(storagePath);
		if (fromPrimary) {
			return fromPrimary;
		}
		return this.secondary.openReadStream(storagePath);
	}

	async delete(storagePath: string): Promise<void> {
		await Promise.all([
			this.primary.delete(storagePath),
			this.secondary.delete(storagePath)
		]);
	}
}
