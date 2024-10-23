import type { IAddressDetail } from "@/@types/Address";
import { createOrderId, getAddress, getCustomerKey, useGetAddressDetail } from "@/components/address/queries";
import { queryKeys } from "@/constants/queryKeys";
import { UseMutateFunction, useMutation, useQuery } from "@tanstack/react-query";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useState } from "react";

interface Props extends IAddressDetail {
  id: string;
}

const clientKey = `${import.meta.env.VITE_TOSS_CLIENT_KEY}`;

export const usePostPayment = (auctionId: string, orderId: string) => {
  const { data: auctionData } = useQuery({
    queryKey: [queryKeys.AUCTION_ADDRESS_DETAIL],
    queryFn: () => useGetAddressDetail(auctionId)
  });

  const { data: DefaultAddressData } = useQuery({
    queryKey: [queryKeys.ADDRESS],
    queryFn: () => getAddress()
  });

  const postPayment = (formData: any, address: Props) => {
    const memo = formData.memo;
    const addressId = address.id;
    const phoneNumber = address.phoneNumber.replace(/-/g, '');

    const fetchPayment = async () => {
      try {
        const customerData = await getCustomerKey();
        const customerKey = customerData.customerKey;
        const tossPayments = await loadTossPayments(clientKey);
        const payment = tossPayments.payment({ customerKey });
        
        payment?.requestPayment({
          method: "CARD", // 카드 결제
          amount: {
            currency: 'KRW',
            value: auctionData.winningAmount
          },
          orderId,
          orderName: auctionData.productName,
          successUrl: window.location.origin + `/payment/success?auctionId=${auctionId}&memo=${encodeURIComponent(JSON.stringify(memo))}&addressId=${addressId}`,
          failUrl: window.location.origin + "/fail",
          customerMobilePhone: phoneNumber,
          customerName: address.recipientName,
          card: {
            useEscrow: false,
            flowMode: "DEFAULT",
            useCardPoint: false,
            useAppCardOnly: false,
          },
        });
      } catch (error) {
        throw error;
      }
    };
    fetchPayment();
  };

  return { auctionData, postPayment, DefaultAddressData };
};

export const usePostOrderId = (): { createId: UseMutateFunction, orderId: string} => {
  const [orderId, setOrderId] = useState<string>('');
  const { mutate: createId } = useMutation({
    mutationFn: createOrderId,
    onSuccess: (data) => {
      setOrderId(data.orderId);
    }
  });

  return { createId, orderId };
};