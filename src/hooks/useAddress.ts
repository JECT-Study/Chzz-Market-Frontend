import { addAddress } from "@/components/address/queries";
import { UseMutateFunction, useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";

export const useAddress = (auctionId: string) => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      navigate(`/auctions/${auctionId}/address-list`)
    }
  });

  return { mutate };
}