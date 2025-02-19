import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

export const readNotification = async (id: number) => {
  const response = await httpClient.post(
    `${API_END_POINT.NOTIFICATION_LIST}/${id}/read`
  );

  return response.data.data;
};
