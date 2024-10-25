import { IAddressDetail } from "@/@types/Address";
import { httpClient } from "@/api/axios";
import { API_END_POINT } from "@/constants/api";
import { queryKeys } from "@/constants/queryKeys";
import ROUTES from "@/constants/routes";
import { UseMutateFunction, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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

export const editAddress = async ({addressId, data }: { addressId: string, data: IAddressDetail }) => {
  await httpClient.put(`${API_END_POINT.ADDRESS}/${addressId}`, { ...data });
}

export const addAddress = async (data: IAddressDetail) => {
  await httpClient.post(API_END_POINT.ADDRESS, { ...data });
};

export const deleteAddress = async (addressId: string) => {
  await httpClient.delete(`${API_END_POINT.ADDRESS}/${addressId}`);
};

export const usePostAddress = (auctionId: string): {mutate: UseMutateFunction<any, Error, IAddressDetail, unknown>;} => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      navigate(ROUTES.getDeliveryAddressListRoute(auctionId));
    }
  });

  return { mutate };
}

export const useEditAddress = (auctionId: string): {mutate: UseMutateFunction<any, Error, { addressId: string, data: IAddressDetail }, unknown>;} => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: ({ addressId, data }: { addressId: string, data: IAddressDetail }) => editAddress({ addressId, data }),
    onSuccess: () => {
      navigate(ROUTES.getDeliveryAddressListRoute(auctionId));
    }
  });

  return { mutate };
}

export const useGetAddresses = () => {
  const { data: addressData } = useQuery({
    queryKey: [queryKeys.ADDRESSES],
    queryFn: () => getAddresses()
  });

  return { addressData };
}

export const useDeleteAddress = () => {
  const { mutate: deleteData } = useMutation({
    mutationFn: deleteAddress,
  });

  return { deleteData };
}