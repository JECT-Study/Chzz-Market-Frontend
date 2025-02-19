import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';
import { removeToken } from '@/shared/utils/token';
import { refreshToken } from '.';

export const logout = async () => {
  await refreshToken();
  await httpClient.post(API_END_POINT.LOGOUT);
  removeToken();
};
