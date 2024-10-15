import { httpClient } from "@/api/axios";
import { useGetAddressDetail } from "@/components/address/queries";
import { API_END_POINT } from "@/constants/api";
import { queryKeys } from "@/constants/queryKeys";
import { UseMutateFunction, useMutation, useQuery } from "@tanstack/react-query";
import { TossPaymentsPayment, loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

interface AddressData {
  imageUrl: string;
  productName: string;
  minPrice: number;
  participantCount: number;
}

const clientKey = `${import.meta.env.VITE_TOSS_CLIENT_KEY}`;
const customerKey = generateRandomString();

export const postPayment = () => {
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 1,
  });

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const payment = tossPayments.payment({ customerKey });
        setPayment(payment);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    };

    fetchPayment();
  }, []);

  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
  const requestPayment = async (auctionId: string, orderId: string) => {
    if (!payment) {
      console.error("Payment not initialized");
      return;
    }

    try {
      await payment.requestPayment({
        method: "CARD", // 카드 결제
        amount,
        orderId,
        orderName: "토스 티셔츠 외 2건",
        successUrl: window.location.origin + `/payment/success?auctionId=${auctionId}&orderId=${orderId}`,
        failUrl: window.location.origin + "/fail",
        customerEmail: "customer123@gmail.com",
        customerName: "김토스",
        customerMobilePhone: "01012341234",
        card: {
          useEscrow: false,
          flowMode: "DEFAULT",
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });
    } catch (error) {
      console.error("Error during payment request:", error);
    }
  };

  return { requestPayment, setAmount };
};

function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}

export const usePostOrderId = (auctionId: string | undefined): { mutate: UseMutateFunction, addressData: AddressData } => {
  const { requestPayment } = postPayment();
  const createOrderId = async () => {
    const response = await httpClient.post(`${API_END_POINT.CREATE_ORDERID}`);
    return response.data;
  };

  const { mutate } = useMutation({
    mutationFn: createOrderId,
    onSuccess: (data) => {
      if (auctionId && data.orderId) {
        requestPayment(auctionId, data.orderId);
      }
    }
  });

  const { data: addressData } = useQuery({
    queryKey: [queryKeys.AUCTION],
    queryFn: () => useGetAddressDetail(auctionId)
  });

  return { mutate, addressData };
};