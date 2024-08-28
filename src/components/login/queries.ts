import { API_END_POINT } from '@/constants/api';
// eslint-disable-next-line import/no-cycle
import { User } from '@/@types/user';
import { httpClient } from '@/api/axios';

export const postSignup = async (data: User, token: string) => {
  const response = await httpClient.post(
    API_END_POINT.SIGNUP,
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
