import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return null;
}
export function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function getErrorMessage(error: Error) {
  let description = 'An unexpected error occurred.';

  if (axios.isAxiosError(error)) {
    const backendPayload = error.response?.data;

    if (backendPayload && Array.isArray(backendPayload.message)) {
      description = backendPayload.message[0];
    } else if (backendPayload && typeof backendPayload.message === 'string') {
      description = backendPayload.message;
    }
  }

  return description;
}

export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}
