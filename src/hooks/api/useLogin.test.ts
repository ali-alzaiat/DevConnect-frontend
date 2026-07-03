import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import useLogin from './useLogin';
import { useLogin as useLoginGenerated } from '@/api/generated/auth/auth';
import { useNavigate, useLocation } from 'react-router';
import { toast } from 'sonner';

vi.mock('@/api/generated/auth/auth', () => ({
  useLogin: vi.fn()
}));

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn()
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe('useLogin', () => {
  const mockNavigate = vi.fn();
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useNavigate as any).mockReturnValue(mockNavigate);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useLocation as any).mockReturnValue({ search: '' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useLoginGenerated as any).mockReturnValue({ mutate: mockMutate });
  });

  it('should call useLoginGenerated with mutation options', () => {
    renderHook(() => useLogin());
    expect(useLoginGenerated).toHaveBeenCalled();
  });

  it('should navigate and store token on success', () => {
    renderHook(() => useLogin());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options = (useLoginGenerated as any).mock.calls[0][0];

    options.mutation.onSuccess({ token: 'mock-token' });

    expect(localStorage.getItem('accessToken')).toBe('mock-token');
    expect(mockNavigate).toHaveBeenCalledWith('/home', { replace: true });
  });

  it('should use redirectTo from search params', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useLocation as any).mockReturnValue({ search: '?redirectTo=/dashboard' });
    renderHook(() => useLogin());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options = (useLoginGenerated as any).mock.calls[0][0];

    options.mutation.onSuccess({ token: 'mock-token' });

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
  });

  it('should show error toast on error', () => {
    renderHook(() => useLogin());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options = (useLoginGenerated as any).mock.calls[0][0];

    options.mutation.onError(new Error('Invalid credentials'));

    expect(toast.error).toHaveBeenCalled();
  });
});
