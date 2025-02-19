import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

export const nicknameCheck = async (nickname: string) => {
  const response = await httpClient.get(
    `${API_END_POINT.NICKNAME_CHECK}/${nickname}`
  );
  return response.data;
};
