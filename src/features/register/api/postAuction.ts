import { API_END_POINT, httpClient } from '@/shared';

export const postAuction = async (formData: FormData) => {
  await httpClient.post(`${API_END_POINT.AUCTION}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
