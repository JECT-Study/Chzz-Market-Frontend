import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshToken } from '../api/refreshToken';
import { storeLogin } from './authSlice';

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
    }
  });

  useEffect(() => {
    if (status === 'success') {
      mutate();
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [status, mutate]);

  return { isSuccess };
};
