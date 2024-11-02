import { usePostOrderId, usePostPayment } from '@/hooks/usePayment';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/shared/shadcn/ui/select';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Layout } from '@/app/layout/index';
import { addressMemo } from '@/constants/address';
import { Button, FormField } from "@/shared";
import rocation_on from '@/shared/assets/icons/rocation_on.svg';
import trophyImage from '@/shared/assets/icons/successful_auction_win.svg';
import { ROUTES } from '@/shared/constants/routes';
import { AuctionShippingSchema } from '@/shared/constants/schema';
import { Input } from '@/shared/shadcn/ui/input';
import { formatCurrencyWithWon } from '@/shared/utils/formatCurrencyWithWon';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type FormFields = z.infer<typeof AuctionShippingSchema>;

const defaultValues = {
  memoSelect: addressMemo[0],
  memoInput: '',
};

export const Payment = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [isVaild, setIsVaild] = useState<boolean>();
  const [isMemoSelectDisabled, setMemoSelectDisabled] = useState(false);
  const location = useLocation();
  const { auctionId } = useParams<{ auctionId: string }>();
  const { createId, orderId, isPending } = usePostOrderId();
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

  const {
    control,
    watch,
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues,
  });

  const memoInputValue = watch('memoInput');
  const formattedAmount = formatCurrencyWithWon(auctionData.winningAmount);

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  const handleClickAddressList = () => navigate(ROUTES.PAYMENT.ADDRESS.getListRoute(auctionId!))

  const onSubmit = (formData: FormFields) => {
    const memo = {
      memo: formData.memoSelect || formData.memoInput || ''
    }
    postPayment(memo, address);
  };


  useEffect(() => {
    if (Object.keys(address).length > 0) {
      setIsVaild(false);
    } else {
      setIsVaild(true);
    }
    if (memoInputValue) {
      setMemoSelectDisabled(true);
    } else {
      setMemoSelectDisabled(false);
    }
  }, [isVaild, memoInputValue]);

  useEffect(() => {
    if (auctionId) {
      createId();
    }
  }, [createId]);

  return (
    <Layout>
      <Layout.Header title="결제하기" handleBack={() => navigate('/')} />
      <Layout.Main>
        <div className="space-y-6">
          {/* 기본 정보 입력 */}
          <div className="py-4 space-y-2 rounded-lg">
            <h2 className="text-heading3 web:text-heading2">기본 정보 입력</h2>
            {/* 상품 정보 */}
            <div className="flex p-2 space-x-4">
              <img
                src={auctionData?.imageUrl}
                alt="product"
                className="object-cover rounded-md w-[6.62rem] h-[6.62rem] web:w-[8rem] web:h-[8rem]"
              />
              <div>
                <p className="text-heading3 web:text-heading2">{auctionData?.productName}</p>
                <div
                  aria-label="결제 금액"
                  className="flex items-center text-body2 web:text-heading3"
                >
                  <img src={trophyImage} alt="트로피" className="w-[1.25rem] h-[1.2rem] web:w-[2rem] web:h-[2rem]" />
                  <span className="overflow-hidden whitespace-nowrap pt-[2px]">
                    결제 금액
                  </span>
                </div>
                <span className="ml-1 text-body2Bold web:text-heading3 text-cheeseYellow">
                  {formattedAmount}
                </span>
              </div>
            </div>
          </div>
          {/* 수령지 입력 */}
          <span className='text-heading3'>수령지 입력</span>
          <div className='flex gap-2'>
            <Button type='button' color={address.isDefault ? 'black' : 'white'} className='w-[10.15rem] h-[3.125rem]'>기본 배송지</Button>
            <Button type='button' color='white' className='w-[10.15rem] h-[3.125rem]' onClick={handleClickAddressList}>배송지 목록</Button>
          </div>
          {/* 배송지 */}
          {Object.keys(address).length > 0 ? (
            <div
              className='flex mb-4 rounded-md'
            >
              <div className="flex items-center">
                <img src={rocation_on} className="mr-2 text-cheeseYellow" alt="위치 아이콘" />
              </div>
              <div className="flex flex-col">
                {address.isDefault && (
                  <span className="flex justify-center w-[4.8rem] h-[1.25rem] text-cheeseYellow text-body2 bg-[#FFF0D3] rounded-sm mb-[10px]">기본배송지</span>
                )}
                <span className="text-body1Bold web:text-heading3">{address.recipientName} / {address.phoneNumber}</span>
                <div className='text-body1'>
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
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}>
            <FormField
              label="배송메모"
              name="memoSelect"
              control={control}
              render={(field) => (
                <Select value={field.value as string} onValueChange={field.onChange} disabled={isMemoSelectDisabled}>
                  <SelectTrigger id='배송메모' className='w-full focus:ring-cheeseYellow'>
                    <SelectValue placeholder='배송메모를 선택하세요.' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className='focus-visible:ring-cheeseYellow'>
                      {addressMemo.map((text) => (
                        <SelectItem key={text} value={text}>
                          {text}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <FormField
              name="memoInput"
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
          disabled={isVaild || isPending}
          loading={isPending}
        >
          결제 하기
        </Button>
      </Layout.Footer>
    </Layout>
  );
};