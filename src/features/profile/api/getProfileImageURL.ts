import { API_END_POINT, httpClient } from '@/shared';

export const getProfileImageURL = async (url: string | undefined) => {
  const response = await httpClient.post(
    `${API_END_POINT.PROFILE_IMAGE_UPLOAD_URL}`,
    url
  );
  return response.data;
};
