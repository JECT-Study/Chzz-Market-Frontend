import { API_END_POINT, httpClient } from "@/shared";

export const getAddresses = async () => {
  const response = await httpClient.get(API_END_POINT.ADDRESS);
  return response.data;
};
