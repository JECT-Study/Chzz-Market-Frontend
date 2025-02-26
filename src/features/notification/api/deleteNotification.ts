import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

export const deleteNotification = async (id: number) => {
  await httpClient.delete(`${API_END_POINT.NOTIFICATION_LIST}/${id}`);

  return;
};
