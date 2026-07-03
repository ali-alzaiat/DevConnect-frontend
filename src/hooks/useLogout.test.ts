import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLogout } from './useLogout';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

vi.mock('react-router', () => ({
  useNavigate: vi.fn()
}));

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: vi.fn()
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn()
  }
}));

describe('useLogout', () => {
  const mockNavigate = vi.fn();
  const mockQueryClient = {
    clear: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useNavigate as any).mockReturnValue(mockNavigate);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useQueryClient as any).mockReturnValue(mockQueryClient);
    localStorage.clear();
  });

  it('should clear storage, cache, show toast and navigate to login', () => {
    localStorage.setItem('accessToken', 'mock-token');
    const { result } = renderHook(() => useLogout());

    act(() => {
      result.current.logout();
    });

    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(mockQueryClient.clear).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('You have been logged out.');
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });
});
