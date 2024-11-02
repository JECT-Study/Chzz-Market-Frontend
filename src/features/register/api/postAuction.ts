import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/index';

export const postAuction = async (formData: FormData) => {
  await httpClient.post(`${API_END_POINT.AUCTION}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
