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

// Refresh (싱글턴 객체) 이걸로 refresh 요청 관리하고 대기중인 요청 처리
export const RefreshHandler = (() => {
  let isRefreshing = false;
  let pendingRequests: Array<{ resolve: (token: string | null) => void; reject: (error: any) => void}> = []; // queue

  const processPendingRequests = (error: any, token: string | null = null) => {
    pendingRequests.forEach(({ resolve, reject }) => {
      if (error) reject(error);
      else resolve(token);
    });
    pendingRequests = [];
  };

  const refreshTokenProcessQueue = async (): Promise<string | null> => {
    if (isRefreshing) {
      // 이미 refresh 중이라면 대기시키기
      return new Promise((resolve, reject) => {
        pendingRequests.push({ resolve, reject });
      });
    }

    isRefreshing = true;

    try {
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        setToken(newAccessToken); // 대기 중인 요청에 새 토큰 전달
        processPendingRequests(null, newAccessToken);
        return newAccessToken;
      } else {
        throw new Error('리프레시 토큰이 만료되었습니다.');
      }
    } catch (error) {
      processPendingRequests(error); // 대기중인 요청에 에러 전달
      throw error;
    } finally {
      isRefreshing = false;
    }
  }

  return { refreshTokenProcessQueue };
})();

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
      if (!originalRequest) return Promise.reject(error);
      if (!error.response) return Promise.reject(error);

      const { response } = error;
      const errorName = response.data?.name;
      const errorMessage = response.data?.message[0];

      if (errorName === 'AUTHENTICATION_REQUIRED') {
        handleTokenError('로그인이 필요합니다.');
      }

      if (response && response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (errorMessage === '리프레시 토큰이 유효하지 않습니다.') {
          handleTokenError(errorMessage);
          return Promise.reject(error); // 바로 재로그인 유도
        }

        if (errorMessage === '토큰이 만료되었습니다.') {
          originalRequest._retry = true;
          
          try {
            const newAccessToken = await RefreshHandler.refreshTokenProcessQueue();
            if (!newAccessToken) throw new Error('리프레시 토큰이 만료되었습니다.');
  
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
