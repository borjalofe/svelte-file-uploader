import { describe, expect, it } from 'vitest';
import { loadApiEnv } from './env.js';

describe('loadApiEnv storage (#84)', () => {
	it('defaults to local driver', () => {
		const env = loadApiEnv(
			{
				FILE_STORAGE_ROOT: '/tmp/pack-files'
			} as NodeJS.ProcessEnv,
			'/tmp'
		);
		expect(env.fileStorageDriver).toBe('local');
		expect(env.s3).toBeUndefined();
	});

	it('parses complete s3 config', () => {
		const env = loadApiEnv(
			{
				FILE_STORAGE_DRIVER: 's3',
				S3_BUCKET: 'pack-uploads',
				S3_REGION: 'eu-west-1',
				S3_PREFIX: 'app/',
				S3_ENDPOINT: 'http://127.0.0.1:9000',
				S3_FORCE_PATH_STYLE: 'true',
				AWS_ACCESS_KEY_ID: 'AKIA',
				AWS_SECRET_ACCESS_KEY: 'secret'
			} as NodeJS.ProcessEnv,
			'/tmp'
		);
		expect(env.fileStorageDriver).toBe('s3');
		expect(env.s3).toEqual({
			bucket: 'pack-uploads',
			region: 'eu-west-1',
			prefix: 'app/',
			endpoint: 'http://127.0.0.1:9000',
			forcePathStyle: true,
			accessKeyId: 'AKIA',
			secretAccessKey: 'secret'
		});
	});

	it('leaves s3 undefined when credentials are incomplete', () => {
		const env = loadApiEnv(
			{
				FILE_STORAGE_DRIVER: 's3',
				S3_BUCKET: 'pack-uploads'
			} as NodeJS.ProcessEnv,
			'/tmp'
		);
		expect(env.fileStorageDriver).toBe('s3');
		expect(env.s3).toBeUndefined();
	});
});
