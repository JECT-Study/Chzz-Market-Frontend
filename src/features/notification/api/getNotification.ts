import { API_END_POINT, httpClient } from '@/shared';

import type { INotification } from '../config';

export const getNotifications = async (): Promise<INotification[]> => {
  const response = await httpClient.get(`${API_END_POINT.NOTIFICATIONS}`);

  return response.data.items;
};
