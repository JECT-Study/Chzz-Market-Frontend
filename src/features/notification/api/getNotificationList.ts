import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

import type { INotification } from '../config';

export const getNotificationList = async (): Promise<INotification[]> => {
  const response = await httpClient.get(`${API_END_POINT.NOTIFICATION_LIST}`);

  return response.data.items;
};
