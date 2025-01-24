import { API_END_POINT, httpClient } from '@/shared';

export const deleteNotification = async (id: number) => {
  await httpClient.delete(`${API_END_POINT.NOTIFICATION_LIST}/${id}`);

  return;
};
