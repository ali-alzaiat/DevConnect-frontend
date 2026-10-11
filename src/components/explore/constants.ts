import { ExploreTab } from './types';

/**
 * Divisible by 2, 3, and 4 so the last page fills whole rows
 * for every common column count of the auto-fill grid.
 */
export const PAGE_SIZE = 12;

export const tabs: { value: ExploreTab; label: string }[] = [
  { value: 'users', label: 'Users' },
  { value: 'projects', label: 'Projects' },
  { value: 'articles', label: 'Articles' },
  { value: 'snippets', label: 'Snippets' }
];
