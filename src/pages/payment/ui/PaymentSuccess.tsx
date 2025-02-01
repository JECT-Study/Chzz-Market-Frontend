import { useNavigate, useSearchParams } from 'react-router-dom';

import { Layout } from '@/app/layout/index';
import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { useEffect } from 'react';

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

export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const requestData: RequestData = {
      auctionId: searchParams.get('auctionId'),
      orderId: searchParams.get('orderId'),
      amount: Number(searchParams.get('amount')),
      paymentKey: searchParams.get('paymentKey'),
      shippingAddressRequest: {
        memo: searchParams.get('memo'),
        addressId: Number(searchParams.get('addressId'))
      }
    };

    const confirm = async () => {
      try {
        const response = await httpClient.post(
          API_END_POINT.PAYMENT,
          requestData
        );

        if (response.status !== 200) {
          navigate(
            `/fail?message=${response.data.message}&code=${response.data.code}`
          );
        }
        // 결제 성공 비지니스 로직 구현
      } catch (error) {
        throw error;
      }
    };

    confirm();
  }, [searchParams, navigate]);

  return (
    <Layout>
      <Layout.Header
        title="결제 성공 페이지"
        handleBack={() => navigate('/')}
      />
      <Layout.Main>
        <div className="flex flex-col">
          {/* 주문 상품 */}
          <div className="flex flex-col">
            <h3 className="mobile:text-body2Bold">주문상품 (1)</h3>
            <p className="text-sm">[나이키] 신발</p>
            <p className="text-sm">주문 번호: {searchParams.get('orderId')}</p>
          </div>

          <div className="border-b-8 border-gray-100 ml-[-32px] mr-[-32px] my-5" />
          {/* 최종 결제 내역 */}
          <div className="flex flex-col">
            <h3 className="mobile:text-body2Bold">최종 결제 내역</h3>
            <div className="text-sm mb-1">총 주문 상품 수: 1개</div>
            <div className="text-sm mb-1">총 배송비: 0원</div>
            <div className="text-lg font-bold text-red-500">
              총 결제 금액:{' '}
              {Number(searchParams.get('amount')).toLocaleString()}원
            </div>
          </div>

          <div className="border-b-8 border-gray-100 ml-[-32px] mr-[-32px] my-5" />
          {/* 배송지 정보 */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-2">배송지 정보</h3>
            <p className="text-sm mb-1">김철수 / 010-1234-5678</p>
            <p className="text-sm">
              서울특별시 중구 회현동 소공로 51
              <br />
              세일빌딩 1층 102호
            </p>
          </div>
        </div>
      </Layout.Main>
    </Layout>
  );
};
