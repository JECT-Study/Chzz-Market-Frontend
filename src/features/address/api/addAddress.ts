import type { IAddressBase } from '@/entities/address/address';
import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

export const addAddress = async (data: IAddressBase) => {
  await httpClient.post(API_END_POINT.ADDRESS, { ...data });
};
