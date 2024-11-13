import { API_END_POINT, httpClient } from "@/shared";

export const deleteAddress = async (addressId: string) => {
  await httpClient.delete(`${API_END_POINT.ADDRESS}/${addressId}`);
};