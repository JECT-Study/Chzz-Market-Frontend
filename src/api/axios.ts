import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getToken, removeToken, setToken } from '@/utils/tokenUtils';

import { refreshToken } from '@/components/login/queries';
import { toast } from 'sonner';

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

interface ErrorResponseData {
  message: string;
  status: string;
}

const handleTokenError = (message: string) => {
  removeToken();
  toast(message);
  window.location.href = '/login';
};

const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join(''),
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

const getAccessTokenExpiration = () => {
  const token = getToken();
  if (token) {
    const parsedToken = parseJwt(token);
    if (parsedToken && parsedToken.exp) {
      return parsedToken.exp * 1000;
    }
  }
  return null;
};

const tokenRefresh = () => {
  const expiration = getAccessTokenExpiration();
  if (expiration) {
    const currentTime = Date.now();
    const timeout = expiration - currentTime - 60000;

    if (timeout > 0) {
      setTimeout(async () => {
        try {
          const refreshData = await refreshToken();
          const newAccessToken = getToken();
          if (!newAccessToken) {
            throw new Error('리프레시 토큰이 만료되었습니다.');
          }
          setToken(newAccessToken);
          tokenRefresh();
        } catch (error) {
          handleTokenError(
            '토큰 갱신 중 오류 발생되었습니다. 다시 로그인해주세요.',
          );
        }
      }, timeout);
    }
  }
};

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 5000,
    ...config,
  });

  axiosInstance.interceptors.request.use(async (request) => {
    let accessToken = getToken();

    if (!accessToken) {
      try {
        const refreshData = await refreshToken();

        accessToken = getToken();
        if (accessToken) {
          request.headers.Authorization = `Bearer ${accessToken}`;
        } else {
          throw new Error('리프레시 토큰이 만료되었습니다.');
        }
      } catch (error) {
        handleTokenError('토큰이 만료되었습니다. 다시 로그인해주세요.');
        return Promise.reject(error);
      }
    } else {
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

        if (errorMessage === '토큰이 만료되었습니다.') {
          try {
            await refreshToken();
            const newAccessToken = getToken();
            if (!newAccessToken)
              throw new Error('리프레시 토큰이 만료되었습니다.');
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return await axiosInstance(originalRequest);
          } catch (refreshError) {
            handleTokenError(
              '리프레시 토큰이 만료되었습니다. 다시 로그인해주세요',
            );
            return Promise.reject(refreshError);
          }
        }

        if (
          errorMessage === '리프레시 토큰이 유효하지 않습니다.' ||
          errorMessage === '리프레시 토큰이 없습니다.'
        ) {
          handleTokenError(
            '리프레시 토큰이 유효하지 않습니다. 다시 로그인해주세요.',
          );
          return Promise.reject(error);
        }

        if (errorMessage === 'Authentication is required') {
          handleTokenError('로그인이 필요합니다.');
          return Promise.reject(error);
        }
      }

      if (response && response.status === 403) {
        handleTokenError('접근 권한이 없습니다.');
        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export const httpClient = createClient();
tokenRefresh();
