import { API_END_POINT, httpClient } from "@/shared";

export const postEditProfileImage = async (url: string | undefined) => {
  const response = await httpClient.post(`${API_END_POINT.PROFILE_IMAGE}`, url);
  return response.data;
};