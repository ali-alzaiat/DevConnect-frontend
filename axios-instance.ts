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
