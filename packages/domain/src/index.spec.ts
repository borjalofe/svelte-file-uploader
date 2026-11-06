import { describe, expect, it } from 'vitest';
import { packageName } from './index.js';

describe('@pack-challenge/domain', () => {
  it('boots and exports packageName', () => {
    expect(packageName()).toBe('@pack-challenge/domain');
  });
});
