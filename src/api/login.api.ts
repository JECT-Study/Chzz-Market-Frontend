import { API_END_POINT } from '@/constants/api';
// eslint-disable-next-line import/no-cycle
import { User } from '@/types/user';
import { httpClient } from '@/utils/axios';

export const postSignup = async (data: User) => {
  const response = await httpClient.post(API_END_POINT.SIGNUP, { ...data });
  return response.data;
};
