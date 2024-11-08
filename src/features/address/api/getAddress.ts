import { API_END_POINT, httpClient } from "@/shared";

export const getAddress = async () => {
  const response = await httpClient.get(`${API_END_POINT.ADDRESS}?size=1`);
  return response.data;
};
