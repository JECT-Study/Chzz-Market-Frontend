import { removeToken, setToken } from '@/utils/tokenUtils';

import { API_END_POINT } from '@/constants/api';
// eslint-disable-next-line import/no-cycle
import type { User } from '@/@types/user';
import { httpClient } from '@/api/axios';
import { storeLogin } from '@/store/authSlice';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

export const postSignup = async (data: User) => {
  const response = await httpClient.post(API_END_POINT.SIGNUP, { ...data });

  const accessToken = response.headers.authorization?.split(' ')[1];

  if (accessToken) {
    setToken(accessToken);
  }

  return response.data;
};

export const logout = async () => {
  await refreshToken();
  await httpClient.post(API_END_POINT.LOGOUT);
  removeToken();
};

export const refreshToken = async () => {
  try {
    const response = await httpClient.post(API_END_POINT.REFRESH_TOKEN);
    const newAccessToken = response.headers.authorization?.split(' ')[1];

    if (newAccessToken) {
      setToken(newAccessToken);
    }

    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

export const nicknameCheck = async (nickname: string) => {
  const response = await httpClient.get(`${API_END_POINT.NICKNAME_CHECK}/${nickname}`);
  return response.data;
};

export const useRefreshTokenOnSuccess = () => {
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(window.location.search);
  const status = queryParams.get('status');

  const { mutate, isSuccess } = useMutation({
    mutationFn: () => refreshToken(),
    onSuccess: () => {
      const newAccessToken = localStorage.getItem('accessToken');
      if (newAccessToken) {
        dispatch(storeLogin({ token: newAccessToken }));
      }
    },
    onError: () => {},
  });

  useEffect(() => {
    if (status === 'success') {
      mutate();
    }
  }, [status, mutate]);

  return { isSuccess };
};
