import axios, { AxiosRequestConfig } from 'axios';

// Create a dedicated Axios instance with your Base URL
export const customInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

// You can even add interceptors here to automatically attach your JWT!
customInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses — clear token and reload to trigger redirect,
// but only when the request actually carried a token (session expiry).
// Requests without a token (e.g. /auth/me on the login page, failed
// login attempts) must reject normally so pages don't reload in a loop.
customInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const hadToken = axios.isAxiosError(error) && !!error.config?.headers?.Authorization;
    if (axios.isAxiosError(error) && error.response?.status === 401 && hadToken) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Export a wrapper function that Orval will use
export const customFetch = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const response = await customInstance({
    ...config,
    ...options
  });

  return response.data;
};
