import { removeToken, setToken } from '@/shared/utils/token';

import { API_END_POINT } from '@/shared/constants/apiEndPoint';
// eslint-disable-next-line import/no-cycle
import type { IUser } from '@/@types/user';
import { storeLogin } from '@/features/auth/model/authSlice';
import { httpClient } from '@/shared/api/axios';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const postSignup = async (data: IUser) => {
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
  });

  useEffect(() => {
    if (status === 'success') {
      mutate();
    }
  }, [status, mutate]);

  return { isSuccess };
};

export const usePostSignup = (): {
  signupMutation: UseMutateFunction<any, Error, IUser, unknown>;
  isPending: boolean;
} => {
  const navigate = useNavigate();

  const { mutate: signupMutation, isPending } = useMutation({
    mutationFn: (data: IUser) => postSignup(data),
    onSuccess: () => {
      navigate('/');
    },
  });

  return { signupMutation, isPending };
};
