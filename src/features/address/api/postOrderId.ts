import { API_END_POINT, httpClient } from "@/shared";

export const postOrderId = async () => {
  const response = await httpClient.post(API_END_POINT.CREATE_ORDERID);
  return response.data;
};