import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

export const postEditProfile = async (formData: FormData) => {
  const response = await httpClient.post(`${API_END_POINT.PROFILE}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};
