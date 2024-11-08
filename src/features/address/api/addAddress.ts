import { IAddressBase } from "@/@types/Address";
import { API_END_POINT, httpClient } from "@/shared";

export const addAddress = async (data: IAddressBase) => {
  await httpClient.post(API_END_POINT.ADDRESS, { ...data });
};