import { ExploreTab } from './types';

export const PAGE_SIZE = 9;

export const tabs: { value: ExploreTab; label: string }[] = [
  { value: 'users', label: 'Users' },
  { value: 'projects', label: 'Projects' },
  { value: 'articles', label: 'Articles' },
  { value: 'snippets', label: 'Snippets' }
];
