import { httpClient } from "@/api/axios";
import { API_END_POINT } from "@/constants/api";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface RequestData {
  orderId: string | null;
  amount: string | null;
  paymentKey: string | null;
  auctionId: string | null;
}

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const auctionId = searchParams.get("auctionId");

  useEffect(() => {
    const requestData: RequestData = {
      auctionId: auctionId,
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    const confirm = async () => {
      try {
        const response = await httpClient.post(API_END_POINT.PAYMENT, requestData);

        if (response.status !== 200) {
          navigate(`/fail?message=${response.data.message}&code=${response.data.code}`);
          return;
        }
        // 결제 성공 비지니스 로직 구현

      } catch (error) {
        console.error(error);
      }
    }

    confirm();
  }, [searchParams, navigate]);

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 성공</h2>
        <p>{`주문번호: ${searchParams.get("orderId")}`}</p>
        <p>{`결제 금액: ${Number(
          searchParams.get("amount")
        ).toLocaleString()}원`}</p>
        <p>{`paymentKey: ${searchParams.get("paymentKey")}`}</p>
      </div>
    </div>
  );
}
export default PaymentSuccess;