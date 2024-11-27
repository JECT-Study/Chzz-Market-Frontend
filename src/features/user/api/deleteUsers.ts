import { API_END_POINT, httpClient } from "@/shared";

export const deleteUsers = async () => {
  const response = await httpClient.delete(API_END_POINT.SIGNUP);

  return response.data;
};