import type { IAddressBase } from '@/entities/address/address';
import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

export const addAddress = async (data: IAddressBase) => {
  await httpClient.post(API_END_POINT.ADDRESS, { ...data });
};
