import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { setToken } from '@/shared/utils/token';

import type { IUser } from '@/entities/user/user';

export const postSignup = async (data: IUser) => {
  const response = await httpClient.post(API_END_POINT.SIGNUP, { ...data });

  const accessToken = response.headers.authorization?.split(' ')[1];

  if (accessToken) {
    setToken(accessToken);
  }

  return response.data;
};
