import { API_END_POINT, httpClient } from "@/shared";

export const nicknameCheck = async (nickname: string) => {
  const response = await httpClient.get(`${API_END_POINT.NICKNAME_CHECK}/${nickname}`);
  return response.data;
};