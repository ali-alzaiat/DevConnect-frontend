import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import useCheckLoginStatus from './useCheckLoginStatus';
import { useCheckLoginStatus as useCheckLoginStatusGenerated } from '@/api/generated/auth/auth';

vi.mock('@/api/generated/auth/auth', () => ({
  useCheckLoginStatus: vi.fn()
}));

describe('useCheckLoginStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call useCheckLoginStatusGenerated', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useCheckLoginStatusGenerated as any).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false
    });

    const { result } = renderHook(() => useCheckLoginStatus());

    expect(useCheckLoginStatusGenerated).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });

  it('should return loading state', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useCheckLoginStatusGenerated as any).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false
    });

    const { result } = renderHook(() => useCheckLoginStatus());

    expect(result.current.isLoading).toBe(true);
  });
});
