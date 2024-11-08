import { IAddressBase } from "@/@types/Address";
import { API_END_POINT, httpClient } from "@/shared";

export const editAddress = async ({addressId, data }: { addressId: string, data: IAddressBase }) => {
  await httpClient.put(`${API_END_POINT.ADDRESS}/${addressId}`, { ...data });
};