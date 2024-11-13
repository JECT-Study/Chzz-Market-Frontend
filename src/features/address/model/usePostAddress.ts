import { IAddressBase } from "@/@types/Address";
import { ROUTES } from "@/shared";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addAddress } from "../api";

export const usePostAddress = (auctionId: string): {
  mutate: UseMutateFunction<any, Error, IAddressBase, unknown>;
  isPending: boolean;
} => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      navigate(ROUTES.PAYMENT.ADDRESS.getListRoute(auctionId), { replace: true });
    },
  });

  return { mutate, isPending };
};