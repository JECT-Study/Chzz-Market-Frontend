import { useNavigate, useSearchParams } from "react-router-dom";

import { API_END_POINT } from "@/constants/api";
import Layout from "@/components/layout/Layout";
import { httpClient } from "@/api/axios";
import { useEffect } from "react";

interface Props {
  addressId: number | null;
  memo: string | null;
}

interface RequestData {
  orderId: string | null;
  amount: number | null;
  paymentKey: string | null;
  auctionId: string | null;
  shippingAddressRequest: Props | null;
}

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const requestData: RequestData = {
      auctionId: searchParams.get("auctionId"),
      orderId: searchParams.get("orderId"),
      amount: Number(searchParams.get("amount")),
      paymentKey: searchParams.get("paymentKey"),
      shippingAddressRequest: {
        memo: searchParams.get("memo"),
        addressId: Number(searchParams.get("addressId"))
      },
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
        throw error;
      }
    }

    confirm();
  }, [searchParams, navigate]);

  return (
    <Layout>
      <Layout.Header title="결제 성공 페이지" handleBack={() => navigate('/')} />
      <Layout.Main>
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
      </Layout.Main>
    </Layout>
  );
}
export default PaymentSuccess;