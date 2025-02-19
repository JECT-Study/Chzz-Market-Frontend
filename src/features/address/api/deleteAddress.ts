import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

export const deleteAddress = async (addressId: string) => {
  await httpClient.delete(`${API_END_POINT.ADDRESS}/${addressId}`);
};
