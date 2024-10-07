/* eslint-disable prettier/prettier */
// src/components/PaymentForm.tsx

import React, { useState } from 'react';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { toast } from 'sonner';

const PaymentForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [orderId, setOrderId] = useState<string>('');
  const [orderName, setOrderName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const tossPayments = await loadTossPayment(
    import.meta.env.VITE_TOSS_CLIENT_KEY
  );

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    const paymentData: PaymentRequest = {
      amount,
      orderId,
      orderName,
      successUrl: 'https://yourdomain.com/payment-success',
      failUrl: 'https://yourdomain.com/payment-fail',
      // 필요한 다른 필드들 추가
    };

    try {
      const response = await initiatePayment(paymentData);
      console.log('결제 시작:', response);
      // 성공 시 처리 (예: successUrl로 리디렉션)
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message); // 에러 메시지를 사용자에게 표시
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <div>
        <label>금액:</label>
        <input
          type='number'
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value, 10))}
        />
      </div>
      <div>
        <label>주문 ID:</label>
        <input
          type='text'
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </div>
      <div>
        <label>주문명:</label>
        <input
          type='text'
          value={orderName}
          onChange={(e) => setOrderName(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type='submit'>결제하기</button>
    </form>
  );
};

export default PaymentForm;
