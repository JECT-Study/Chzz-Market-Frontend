import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

export const deleteAddress = async (addressId: string) => {
  await httpClient.delete(`${API_END_POINT.ADDRESS}/${addressId}`);
};
