import { AddressDetail } from "@/@types/Address";
import { addAddress, deleteAddress, getAddresses } from "@/components/address/queries";
import { queryKeys } from "@/constants/queryKeys";
import { UseMutateFunction, useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";

export const usePostAddress = (auctionId: string): {mutate: UseMutateFunction<any, Error, AddressDetail, unknown>;} => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      navigate(`/auctions/${auctionId}/address-list`)
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