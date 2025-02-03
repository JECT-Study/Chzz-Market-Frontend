import type { IAddressBase } from '@/entities/address/address';
import { API_END_POINT, httpClient } from '@/shared';

export const addAddress = async (data: IAddressBase) => {
  await httpClient.post(API_END_POINT.ADDRESS, { ...data });
};
