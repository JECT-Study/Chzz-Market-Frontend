import { getToken, removeToken, setToken } from '@/utils/tokenUtils';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { refreshToken } from '@/components/login/queries';
import { toast } from 'sonner';

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

interface ErrorResponseData {
  message: string;
  status: string;
  name: string;
}

const handleTokenError = (message: string) => {
  removeToken();
  toast(message);
  window.location.href = '/login';
};

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 10000,
    ...config,
  });

  axiosInstance.interceptors.request.use(async (request) => {
    const accessToken = getToken();
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ErrorResponseData>) => {
      const originalRequest = error.config as AxiosRequestConfigWithRetry;
      if (!originalRequest) {
        return Promise.reject(error);
      }
      if (!error.response) {
        return Promise.reject(error);
      }

      const { response } = error;
      const errorName = response.data?.name;
      if (errorName === 'AUTHENTICATION_REQUIRED') {
        handleTokenError('로그인이 필요합니다.');
      }

      if (response && response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const errorMessage = response.data?.message[0];

        if (errorMessage === '토큰이 만료되었습니다.') {
          originalRequest._retry = true;

          try {
            await refreshToken();
            const newAccessToken = getToken();

            if (!newAccessToken) {
              throw new Error('리프레시 토큰이 만료되었습니다.');
            }

            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            setToken(newAccessToken);

            return await axiosInstance(originalRequest);
          } catch (refreshError) {
            handleTokenError('리프레시 토큰이 만료되었습니다. 다시 로그인해주세요.');
            return Promise.reject(refreshError);
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const httpClient = createClient();
