import { refreshToken } from '@/components/login/queries';
import { getToken, removeToken } from '@/utils/tokenUtils';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

interface ErrorResponseData {
  message: string;
  status: string;
}

const handleTokenError = (message: string) => {
  removeToken();
  alert(message);
  window.location.href = '/login';
};

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_MOCK_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 5000,
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

      const { response } = error;
      if (response && response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const errorMessage = response.data?.message;

        if (
          errorMessage === '리프레시 토큰이 만료되었습니다.' ||
          errorMessage === '토큰이 만료되었습니다.'
        ) {
          refreshToken();
          const newAccessToken = getToken();
          if (!newAccessToken)
            throw new Error('리프레시 토큰이 만료되었습니다.');

          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        }

        if (
          [
            'Authentication is required',
            '리프레시 토큰이 유효하지 않습니다.',
          ].includes(errorMessage)
        ) {
          handleTokenError('로그인이 필요합니다.');
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export const httpClient = createClient();
