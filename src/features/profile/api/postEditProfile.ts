import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

export const postEditProfile = async (formData: FormData) => {
  const response = await httpClient.post(`${API_END_POINT.PROFILE}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};
