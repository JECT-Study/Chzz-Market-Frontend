import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { usePostOrderId, usePostPayment } from '@/hooks/usePayment';

import { AuctionShippingSchema } from '@/constants/schema';
import Button from '@/components/common/Button';
import FormField from '@/components/common/form/FormField';
import { Input } from '@/components/ui/input';
import Layout from '@/components/layout/Layout';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';
import rocation_on from '@/assets/icons/rocation_on.svg';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type FormFields = z.infer<typeof AuctionShippingSchema>;

const defaultValues = {
  memo: ''
};

const AuctionShipping = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const location = useLocation();
  const { auctionId } = useParams<{ auctionId: string }>();
  const { createId, orderId } = usePostOrderId();
  const { auctionData = { productName: '', imageUrl: '', winningAmount: 0 }, DefaultAddressData, postPayment } = usePostPayment(auctionId || '', orderId);
  let address = {
    id: '',
    recipientName: '',
    phoneNumber: '',
    zipcode: '',
    roadAddress: '',
    jibun: '',
    detailAddress: '',
    isDefault: false,
  }
  if (DefaultAddressData || location.state?.address) {
    const selectedAddress = location.state?.address || DefaultAddressData.items[0];

    address = { ...selectedAddress }
  }

  useEffect(() => {
    if (auctionId) {
      createId();
    }
  }, [createId]);

  const {
    control,
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues,
  });

  const formattedAmount = formatCurrencyWithWon(auctionData.winningAmount);

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  const handleClickAddressList = () => {
    navigate(`/auctions/${auctionId}/address-list`);
  }

  const onSubmit = (formData: FormFields) => {
    postPayment(formData, address);
  };

  return (
    <Layout>
      <Layout.Header title="결제하기" handleBack={() => navigate('/')} />
      <Layout.Main>
        <div className="space-y-6">
          {/* 기본 정보 입력 */}
          <div className="py-4 space-y-2 rounded-lg">
            <h2 className="text-lg font-semibold">기본 정보 입력</h2>
            {/* 상품 정보 */}
            <div className="flex p-2 space-x-4">
              <img
                src={auctionData?.imageUrl}
                alt="product"
                className="object-cover rounded-md w-28 h-28 xs:w-24 xs:h-24"
              />
              <div>
                <p className="font-bold">{auctionData?.productName}</p>
                <p>결제 금액</p>
                <p className="font-semibold text-cheeseYellow heading3">{formattedAmount}</p>
              </div>
            </div>
          </div>
          {/* 수령지 입력 */}
          <span className='text-heading3'>수령지 입력</span>
          <div className='flex gap-2'>
            <Button type='button' size='large' color='black'>기본 배송지</Button>
            <Button type='button' size='large' color='white' onClick={handleClickAddressList}>배송지 목록</Button>
          </div>
          {/* 배송지 */}
          {Object.keys(address).length > 0 ? (
            <div
              className='flex p-4 mb-4 rounded-md'
            >
              <div className="flex items-center">
                <img src={rocation_on} className="mr-2 text-cheeseYellow" alt="위치 아이콘" />
              </div>
              <div className="flex flex-col gap-2 mb-2">
                {address.isDefault && (
                  <span className="font-semibold text-cheeseYellow text-body2">기본배송지</span>
                )}
                <span className="font-bold">{address.recipientName} / {address.phoneNumber}</span>
                <div className="text-gray2">
                  <p>{address.roadAddress}</p>
                  <p>{address.detailAddress}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>기본 배송지가 없습니다. 배송지 목록에서 배송지를 추가해주세요.</div>
          )}
          <form
            ref={formRef}
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}>
            <FormField
              label="배송메모"
              name="memo"
              control={control}
              render={(field) => (
                <Input
                  id="배송메모"
                  type="text"
                  placeholder="배송 메모를 입력해주세요"
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                />
              )}
            />
          </form>
        </div>
      </Layout.Main>
      <Layout.Footer type="single">
        <Button
          type="button"
          className="w-full h-[47px] rounded-lg"
          color="cheeseYellow"
          onClick={handleSubmitClick}
        >
          결제 하기
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export default AuctionShipping;
