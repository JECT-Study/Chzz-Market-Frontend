import { API_END_POINT, httpClient } from '@/shared';
import type { INotification } from '../config';

export const getNotifications = async (): Promise<INotification[]> => {
  const response = await httpClient.get(`${API_END_POINT.NOTIFICATIONS}`);
  if (!response.data || !response.data.items) {
    throw new Error('No items found in the response');
  }
  return response.data.items;
};
