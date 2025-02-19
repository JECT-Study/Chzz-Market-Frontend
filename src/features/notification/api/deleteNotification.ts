import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

export const deleteNotification = async (id: number) => {
  await httpClient.delete(`${API_END_POINT.NOTIFICATION_LIST}/${id}`);

  return;
};
