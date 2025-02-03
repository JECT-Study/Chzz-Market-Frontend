import { API_END_POINT, httpClient, removeToken } from '@/shared';
import { refreshToken } from '.';

export const logout = async () => {
  await refreshToken();
  await httpClient.post(API_END_POINT.LOGOUT);
  removeToken();
};
