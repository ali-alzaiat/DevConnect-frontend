import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import useSignup from './useSignup';
import { useSignup as useSignupGenerated } from '@/api/generated/auth/auth';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

vi.mock('@/api/generated/auth/auth', () => ({
  useSignup: vi.fn()
}));

vi.mock('react-router', () => ({
  useNavigate: vi.fn()
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe('useSignup', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useNavigate as any).mockReturnValue(mockNavigate);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useSignupGenerated as any).mockReturnValue({ mutate: vi.fn() });
  });

  it('should call useSignupGenerated with mutation options', () => {
    renderHook(() => useSignup());
    expect(useSignupGenerated).toHaveBeenCalled();
  });

  it('should navigate to login and show success toast on success', () => {
    renderHook(() => useSignup());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options = (useSignupGenerated as any).mock.calls[0][0];

    options.mutation.onSuccess();

    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(toast.success).toHaveBeenCalledWith('Account created successfully');
  });

  it('should show error toast on error', () => {
    renderHook(() => useSignup());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options = (useSignupGenerated as any).mock.calls[0][0];

    options.mutation.onError(new Error('Email already exists'));

    expect(toast.error).toHaveBeenCalled();
  });
});
