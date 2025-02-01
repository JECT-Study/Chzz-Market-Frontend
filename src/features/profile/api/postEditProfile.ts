import { API_END_POINT, httpClient } from '@/shared';

export const postEditProfile = async (formData: FormData) => {
  const response = await httpClient.post(`${API_END_POINT.PROFILE}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};
