import type { IAddressBase } from "@/entities/address/address";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { editAddress } from "../api";
import { ROUTES } from "@/shared";

export const useEditAddress = (auctionId: string): {
  mutate: UseMutateFunction<any, Error, { addressId: string, data: IAddressBase }, unknown>;
  isPending: boolean;
} => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ addressId, data }: { addressId: string, data: IAddressBase }) => editAddress({ addressId, data }),
    onSuccess: () => {
      navigate(ROUTES.PAYMENT.ADDRESS.getListRoute(auctionId), { replace: true });
    },
  });

  return { mutate, isPending };
};
