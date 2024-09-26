import { removeToken, setToken } from '@/utils/tokenUtils';

import { API_END_POINT } from '@/constants/api';
// eslint-disable-next-line import/no-cycle
import { User } from '@/@types/user';
import { httpClient } from '@/api/axios';

export const postSignup = async (data: User) => {
  const response = await httpClient.post(
    API_END_POINT.SIGNUP,
    { ...data },
    { withCredentials: true },
  );

  const accessToken = response.headers.authorization;

  if (accessToken && accessToken.startsWith('Bearer ')) {
    const token = accessToken.split(' ')[1];
    setToken(token);
  }

  return response.data;
};

export const logout = async () => {
  // await httpClient.post(API_END_POINT.LOGOUT, {}, { withCredentials: true });
  // removeToken();
};

export const refreshToken = async () => {
  // try {
  //   const response = await httpClient.post(
  //     API_END_POINT.REFRESH_TOKEN,
  //     {},
  //     { withCredentials: true },
  //   );
  //   const accessToken = response.headers.authorization;
  //   if (accessToken && accessToken.startsWith('Bearer ')) {
  //     const token = accessToken.split(' ')[1];
  //     setToken(token);
  //   }
  //   return response.data;
  // } catch (error) {
  //   removeToken();
  //   throw error;
  // }
};
