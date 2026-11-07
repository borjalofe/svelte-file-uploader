import type { Readable } from 'node:stream';
import type { ResourceFileMimeType } from '@pack-challenge/domain';

/** Relative key persisted as `storagePath` (e.g. `resources/<uuid>.pdf`). */
export type StoredObject = {
	storagePath: string;
};

export type OpenedObject = {
	stream: Readable;
};

/**
 * Durable object store for resource file bytes.
 * Implementations must reject traversal / absolute keys (fail closed).
 */
export interface FileStore {
	writeResourceFile(mimeType: ResourceFileMimeType, bytes: Buffer): Promise<StoredObject>;
	exists(storagePath: string): Promise<boolean>;
	openReadStream(storagePath: string): Promise<OpenedObject | null>;
	/** Best-effort remove after a failed DB insert (or explicit cleanup). */
	delete(storagePath: string): Promise<void>;
}
