import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '@/components/common/Button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import FormField from '@/components/common/form/FormField';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';
import Layout from '@/components/layout/Layout';
import rocation_on from '@/assets/icons/rocation_on.svg';
import { AuctionPaymentSchema } from '@/constants/schema';
import { usePostOrderId, usePostPayment } from '@/hooks/usePayment';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';

type FormFields = z.infer<typeof AuctionPaymentSchema>;

const defaultValues = {
  memo: ''
};

const AuctionPayment = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const location = useLocation();
  const { auctionId } = useParams<{ auctionId: string }>();
  const { createId, orderId } = usePostOrderId();
  const { auctionData = { productName: '', imageUrl: '', winningAmount: 0 }, DefaultAddressData = { items: [] }, postPayment} = usePostPayment(auctionId || '', orderId);
  const address = location.state?.address || (DefaultAddressData.items.length > 0 ? DefaultAddressData.items[0] : { recipientName: '', phoneNumber: '', roadAddress: '', detailAddress: '' });

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (auctionId) {
      createId();
    }
  }, [createId]);
  
  const {
    control,
    watch,
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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const onSubmit = (formData: FormFields) => {
    postPayment(formData, address);
  };

  return (
    <Layout>
      <Layout.Header title="결제하기" handleBack={() => navigate('/')} />
      <Layout.Main>
        <div className="space-y-6">
          {/* 기본 정보 입력 */}
          <div className="p-4 space-y-2 rounded-lg">
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
                <p className="text-cheeseYellow heading3 font-semibold">{formattedAmount}</p>
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
          <div
            className='flex p-4 rounded-md mb-4'
          >
            <div className="flex items-center">
            <img src={rocation_on} className="text-cheeseYellow mr-2" alt="위치 아이콘" />
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <span className="text-cheeseYellow text-body2 font-semibold">기본배송지</span>
              <span className="font-bold">{address.recipientName} / {address.phoneNumber}</span>
              <div className="text-gray2">
                <p>{address.roadAddress}</p>
                <p>{address.detailAddress}</p>
              </div>
            </div>
          </div>
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

          <h3 className="text-heading3">결제 방법</h3>
          <div className="flex">
            <Button type="button" color="black">
              토스로 결제
            </Button>
          </div>
          
          <div className="flex items-center">
            <input type="checkbox" id="agree" className="mr-2" checked={isChecked} onChange={handleCheckboxChange} />
            <label htmlFor="agree" className="text-sm">
              주의사항을 모두 확인하였으며 위 내용에 동의합니다.
            </label>
          </div>
        </div>
      </Layout.Main>
      <Layout.Footer type="single">
        <Button
          type="submit"
          className="w-full h-[47px] rounded-lg"
          color={isChecked ? 'cheeseYellow' : 'gray3'}
          onClick={handleSubmitClick}
          disabled={!isChecked}
        >
          결제 하기
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export default AuctionPayment;
