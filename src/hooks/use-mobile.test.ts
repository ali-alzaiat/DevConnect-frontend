import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIsMobile } from './use-mobile';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

describe('useIsMobile', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });
  });

  it('should return true if window width is below 768px', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 500 });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should return false if window width is 768px or above', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });
});
