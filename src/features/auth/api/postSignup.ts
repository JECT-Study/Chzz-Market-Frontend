import { API_END_POINT, httpClient, setToken } from '@/shared';

import type { IUser } from '@/entities/user';

export const postSignup = async (data: IUser) => {
  const response = await httpClient.post(API_END_POINT.SIGNUP, { ...data });

  const accessToken = response.headers.authorization?.split(' ')[1];

  if (accessToken) {
    setToken(accessToken);
  }

  return response.data;
};
