import { AddressDetail } from "@/@types/Address";
import { httpClient } from "@/api/axios";
import { API_END_POINT } from "@/constants/api";

export const useGetAddressDetail = async (auctionId: string) => {
  const response = await httpClient.get(`${API_END_POINT.AUCTIONS}/${auctionId}/winning-bid`);
  return response.data;
};

export const createOrderId = async () => {
  const response = await httpClient.post(API_END_POINT.CREATE_ORDERID);
  return response.data;
};

export const getCustomerKey = async () => {
  const response = await httpClient.get(API_END_POINT.CUSTOMER_KEY);
  return response.data;
};

export const getAddress = async () => {
  const response = await httpClient.get(`${API_END_POINT.ADDRESS}?size=1`);
  return response.data;
};

export const getAddresses = async () => {
  const response = await httpClient.get(API_END_POINT.ADDRESS);
  return response.data;
};

export const editAddress = async (data: AddressDetail) => {
  await httpClient.put(API_END_POINT.ADDRESS, { ...data });
}

export const addAddress = async (data: AddressDetail) => {
  await httpClient.post(API_END_POINT.ADDRESS, { ...data });
};

export const deleteAddress = async (addressId: string) => {
  await httpClient.delete(`${API_END_POINT.ADDRESS}/${addressId}`);
};