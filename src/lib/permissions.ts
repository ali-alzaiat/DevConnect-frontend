/**
 * Mirrors the backend ItemPermission levels returned on detail responses.
 * Kept as plain strings so it works with all three generated DTO unions.
 */
export type ItemPermission = 'ADMIN' | 'OWNER' | 'EDIT' | 'SHARE' | 'VIEW';

/** Levels that allow editing/deleting an item */
export const EDIT_LEVELS: ItemPermission[] = ['ADMIN', 'OWNER', 'EDIT'];

export const canEditItem = (permission: string | undefined): boolean =>
  !!permission && EDIT_LEVELS.includes(permission as ItemPermission);
