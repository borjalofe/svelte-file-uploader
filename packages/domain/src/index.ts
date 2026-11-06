/** Shared domain types and Zod schemas land here in later milestones. */
export const DOMAIN_PACKAGE = '@pack-challenge/domain' as const;

export function packageName(): string {
  return DOMAIN_PACKAGE;
}
