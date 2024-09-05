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

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
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
    (response) => {
      return response;
    },
    async (error: AxiosError<ErrorResponseData>) => {
      const originalRequest = error.config as AxiosRequestConfigWithRetry;
      if (!originalRequest) {
        return Promise.reject(error);
      }

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        const errorMessage = error.response.data?.message;
        console.log(errorMessage);

        originalRequest._retry = true;

        if (errorMessage === '토큰이 만료되었습니다.') {
          try {
            await refreshToken();
            const newAccessToken = getToken();

            originalRequest.headers = originalRequest.headers || {};
            if (newAccessToken) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return await axiosInstance(originalRequest);
            }
            removeToken();
            alert('로그인이 필요합니다.');
            window.location.href = '/login';
          } catch (refreshError) {
            if (refreshError === '리프레시 토큰이 유효하지 않습니다.') {
              removeToken();
              alert('리프레쉬 토큰이 만료');
              window.location.href = '/login';
            }
          }
        }

        if (errorMessage === 'Authentication is required') {
          removeToken();
          alert('로그인이 필요합니다.');
          window.location.href = '/login';
          return Promise.reject(error);
        }

        if (errorMessage === '리프레시 토큰이 유효하지 않습니다.') {
          removeToken();
          alert('리프레쉬 토큰이 만료');
          window.location.href = '/login';
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export const httpClient = createClient();
