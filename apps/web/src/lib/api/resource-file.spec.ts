import { afterEach, describe, expect, it, vi } from 'vitest';
import { openResourceFile, resourceFileUrl } from './resource-file.js';

describe('resourceFileUrl (#77)', () => {
	it('builds GET /resources/:id/file under the public API origin', () => {
		expect(resourceFileUrl('11111111-1111-4111-8111-111111111111')).toMatch(
			/\/resources\/11111111-1111-4111-8111-111111111111\/file$/
		);
	});
});

describe('openResourceFile (#77)', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it('fetches the API file path and triggers a download link', async () => {
		const blob = new Blob(['%PDF'], { type: 'application/pdf' });
		const fetchImpl = vi.fn().mockResolvedValue({
			ok: true,
			blob: async () => blob
		});

		const click = vi.fn();
		const remove = vi.fn();
		const anchor = {
			href: '',
			download: '',
			rel: '',
			target: '',
			click,
			remove
		} as unknown as HTMLAnchorElement;

		vi.stubGlobal('document', {
			createElement: vi.fn(() => anchor),
			body: { appendChild: vi.fn() }
		});
		const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:resource');
		const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);

		await openResourceFile('11111111-1111-4111-8111-111111111111', 'doc.pdf', fetchImpl);

		expect(fetchImpl).toHaveBeenCalledOnce();
		expect(String(fetchImpl.mock.calls[0]?.[0])).toMatch(/\/resources\/.+\/file$/);
		expect(anchor.download).toBe('doc.pdf');
		expect(click).toHaveBeenCalledOnce();
		expect(createObjectURL).toHaveBeenCalledOnce();
		expect(revokeObjectURL).toHaveBeenCalledWith('blob:resource');
	});

	it('rejects when the API returns a non-OK status', async () => {
		const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 404 });
		await expect(openResourceFile('missing', 'x.pdf', fetchImpl)).rejects.toThrow(/404/);
	});
});
