import type { IAddressBase } from '@/entities/address/address';
import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

export const editAddress = async ({
  addressId,
  data
}: {
  addressId: string;
  data: IAddressBase;
}) => {
  await httpClient.put(`${API_END_POINT.ADDRESS}/${addressId}`, { ...data });
};
