import { createOrderId, getAddress, getCustomerKey, useGetAddressDetail } from "@/components/address/queries";
import { queryKeys } from "@/constants/queryKeys";
import { UseMutateFunction, useMutation, useQuery } from "@tanstack/react-query";
import { TossPaymentsPayment, loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useState } from "react";

const clientKey = `${import.meta.env.VITE_TOSS_CLIENT_KEY}`;

export const usePostPayment = (auctionId: string, orderId: string) => {
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
  const { data: auctionData } = useQuery({
    queryKey: [queryKeys.AUCTION_ADDRESS_DETAIL],
    queryFn: () => useGetAddressDetail(auctionId)
  });

  const { data: DefaultAddressData } = useQuery({
    queryKey: [queryKeys.ADDRESS],
    queryFn: () => getAddress()
  });

  const postPayment = () => {
    const fetchPayment = async () => {
      try {
        const customerData = await getCustomerKey();
        const customerKey = customerData.customerKey;
        const tossPayments = await loadTossPayments(clientKey);
        const payment = tossPayments.payment({ customerKey });
        setPayment(payment);
      } catch (error) {
        throw error;
      }
    };

    fetchPayment();
  };
  
  try {
    payment?.requestPayment({
      method: "CARD", // 카드 결제
      amount: {
        currency: 'KRW',
        value: auctionData.winningAmount
      },
      orderId,
      orderName: auctionData.productName,
      successUrl: window.location.origin + `/payment/success?auctionId=${auctionId}`,
      failUrl: window.location.origin + "/fail",
      customerEmail: "customer123@gmail.com",
      customerName: '김토스',
      customerMobilePhone: "01012345678",
      card: {
        useEscrow: false,
        flowMode: "DEFAULT",
        useCardPoint: false,
        useAppCardOnly: false,
      },
    });
  } catch (error) {
    throw error;
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