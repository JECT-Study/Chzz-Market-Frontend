import { API_END_POINT } from '@/constants/api';
// eslint-disable-next-line import/no-cycle
import { User } from '@/@types/user';
import { httpClient } from '@/api/axios';
import { updateReduxAuthState } from '@/utils/tokenUtils';

export const postSignup = async (data: User) => {
  const response = await httpClient.post(
    API_END_POINT.SIGNUP,
    { ...data },
    { withCredentials: true },
  );

  const accessToken = response.headers.authorization;

  if (accessToken && accessToken.startsWith('Bearer ')) {
    const token = accessToken.split(' ')[1];
    updateReduxAuthState(token);
    localStorage.setItem('accessToken', token);
  }

  return response.data;
};

export const refreshToken = async () => {
  const response = await httpClient.post(API_END_POINT.REFRESH_TOKEN);
  return response.data;
};
