import { refreshToken } from '@/components/login/queries';
import { getToken, setToken, updateReduxAuthState } from '@/utils/tokenUtils';
import axios, { AxiosRequestConfig } from 'axios';

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

  axiosInstance.interceptors.request.use((request) => {
    request.headers.Authorization = `Bearer ${getToken() ? getToken() : ''}`;
    return request;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const hasToken = getToken();

      if (error.response.status === 401) {
        if (hasToken) {
          const refreshedToken = await refreshToken();

          updateReduxAuthState(refreshedToken);
          setToken(refreshedToken);

          return axiosInstance(originalRequest);
        }
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export const httpClient = createClient();
