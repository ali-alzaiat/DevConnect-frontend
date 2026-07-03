import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('deduplicates conflicting tailwind classes', () => {
    const result = cn('text-red-500', 'text-blue-500');
    expect(result).toBe('text-blue-500');
  });

  it('merges tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4');
    expect(result).toContain('px-4');
    expect(result).toContain('py-1');
    expect(result).not.toContain('px-2');
  });

  it('handles conditional classes', () => {
    const shouldShow = false;
    const result = cn('base-class', shouldShow && 'hidden-class', 'extra-class');
    expect(result).toContain('base-class');
    expect(result).toContain('extra-class');
    expect(result).not.toContain('hidden-class');
  });
});
