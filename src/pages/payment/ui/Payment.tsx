import { Button, FormField, ProgressiveImage } from '@/shared';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/ui/select';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { Layout } from '@/app/layout/index';
import type { IAddressWithId } from '@/entities/address/address';
import { addressMemo } from '@/features/address/config/address';
import { usePostPayment } from '@/features/address/model';
import { usePostOrderId } from '@/features/address/model/usePostPayment';
import rocation_on from '@/shared/assets/icons/rocation_on.svg';
import trophyImage from '@/shared/assets/icons/successful_auction_win.svg';
import { ROUTES } from '@/shared/constants/routes';
import { AuctionShippingSchema } from '@/shared/constants/schema';
import { Input } from '@/shared/ui/input';
import { formatCurrencyWithWon } from '@/shared/utils/formatCurrencyWithWon';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type FormFields = z.infer<typeof AuctionShippingSchema>;

const defaultValues = {
  memoSelect: addressMemo[0],
  memoInput: ''
};

export const Payment = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [isValid, setIsValid] = useState<boolean>();
  const [isMemoSelectDisabled, setMemoSelectDisabled] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<IAddressWithId | null>(
    null
  );
  const location = useLocation();
  const { auctionId } = useParams<{ auctionId: string }>();
  const { createId, orderId, isPending } = usePostOrderId();
  const {
    auctionData = { auctionName: '', imageUrl: '', winningAmount: 0 },
    DefaultAddressData,
    auctionDataIsLoading,
    postPayment
  } = usePostPayment(auctionId || '', orderId);
  let address: IAddressWithId = {
    id: '',
    recipientName: '',
    phoneNumber: '',
    zipcode: '',
    roadAddress: '',
    jibun: '',
    detailAddress: '',
    isDefault: false
  };
  if (DefaultAddressData || location.state?.address) {
    const selectedAddress =
      location.state?.address || DefaultAddressData.items[0];

    address = { ...selectedAddress };
  }

  const { control, watch, handleSubmit } = useForm<FormFields>({
    defaultValues
  });

  const memoInputValue = watch('memoInput');
  const formattedAmount = formatCurrencyWithWon(auctionData.winningAmount);

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    }
  };

  const handleClickAddressList = () =>
    navigate(ROUTES.PAYMENT.ADDRESS.getListRoute(auctionId!));

  const handleClickDefaultAddress = () => {
    if (DefaultAddressData.items[0].isDefault) {
      setSelectedAddress(DefaultAddressData.items[0]);
    }
  };

  const onSubmit = (formData: FormFields) => {
    const memo = {
      memo: formData.memoSelect || formData.memoInput || ''
    };
    postPayment(memo, address);
  };

  useEffect(() => {
    const isAddressValid =
      address.recipientName && address.roadAddress && address.detailAddress;
    setIsValid(!isAddressValid);
    setMemoSelectDisabled(!!memoInputValue);
  }, [isValid, memoInputValue]);

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
              <ProgressiveImage
                lowResSrc={`${auctionData?.imageUrl}?h=20`}
                highResSrc={`${auctionData?.imageUrl}?h=228`}
                alt="product"
                className="object-cover rounded-md w-[6.62rem] h-[6.62rem] web:w-[8rem] web:h-[8rem]"
                priority="high"
              />
              <div>
                <p className="text-heading3 web:text-heading2">
                  {auctionData?.auctionName}
                </p>
                <div
                  aria-label="결제 금액"
                  className="flex items-center text-body2 web:text-heading3"
                >
                  <img
                    src={trophyImage}
                    alt="트로피"
                    className="w-[1.25rem] h-[1.2rem] web:w-[2rem] web:h-[2rem]"
                  />
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
          <span className="text-heading3">수령지 입력</span>
          <div className="flex gap-2">
            <Button
              type="button"
              color={
                selectedAddress?.isDefault
                  ? 'black'
                  : address.isDefault
                    ? 'black'
                    : 'white'
              }
              className="w-[10.15rem] h-[3.125rem]"
              onClick={handleClickDefaultAddress}
            >
              기본 배송지
            </Button>
            <Button
              type="button"
              color="white"
              className="w-[10.15rem] h-[3.125rem]"
              onClick={handleClickAddressList}
            >
              배송지 목록
            </Button>
          </div>
          {/* 배송지 */}
          {auctionDataIsLoading ? (
            <div className="flex mb-4 rounded-md animate-pulse">
              <div className="flex items-center w-6 h-6 mr-2 bg-gray-200 rounded-full" />
              <div className="flex flex-col space-y-2">
                <div className="w-32 h-4 bg-gray-200 rounded" />
                <div className="w-48 h-4 bg-gray-200 rounded" />
                <div className="w-40 h-4 bg-gray-200 rounded" />
              </div>
            </div>
          ) : selectedAddress ? (
            <div className="flex mb-4 rounded-md">
              <div className="flex items-center">
                <img
                  src={rocation_on}
                  className="mr-2 text-cheeseYellow"
                  alt="위치 아이콘"
                />
              </div>
              <div className="flex flex-col">
                {selectedAddress.isDefault && (
                  <span className="flex justify-center w-[4.8rem] h-[1.25rem] text-cheeseYellow text-body2 bg-[#FFF0D3] rounded-sm mb-[10px]">
                    기본배송지
                  </span>
                )}
                <span className="text-body1Bold web:text-heading3">
                  {selectedAddress.recipientName} /{' '}
                  {selectedAddress.phoneNumber}
                </span>
                <div className="text-body1">
                  <p>{selectedAddress.roadAddress}</p>
                  <p>{selectedAddress.detailAddress}</p>
                </div>
              </div>
            </div>
          ) : Object.keys(address).length > 0 ? (
            <div className="flex mb-4 rounded-md">
              <div className="flex items-center">
                <img
                  src={rocation_on}
                  className="mr-2 text-cheeseYellow"
                  alt="위치 아이콘"
                />
              </div>
              <div className="flex flex-col">
                {address.isDefault && (
                  <span className="flex justify-center w-[4.8rem] h-[1.25rem] text-cheeseYellow text-body2 bg-[#FFF0D3] rounded-sm mb-[10px]">
                    기본배송지
                  </span>
                )}
                <span className="text-body1Bold web:text-heading3">
                  {address.recipientName} / {address.phoneNumber}
                </span>
                <div className="text-body1">
                  <p>{address.roadAddress}</p>
                  <p>{address.detailAddress}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              기본 배송지가 없습니다. 배송지 목록에서 배송지를 추가해주세요.
            </div>
          )}
          <form
            ref={formRef}
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              label="배송메모"
              name="memoSelect"
              control={control}
              render={(field) => (
                <Select
                  value={field.value as string}
                  onValueChange={field.onChange}
                  disabled={isMemoSelectDisabled}
                >
                  <SelectTrigger
                    id="배송메모"
                    className="w-full focus:ring-cheeseYellow"
                  >
                    <SelectValue placeholder="배송메모를 선택하세요." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="focus-visible:ring-cheeseYellow">
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
                  aria-label="배송메모"
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
          disabled={isValid || isPending}
          loading={isPending}
        >
          결제하기
        </Button>
      </Layout.Footer>
    </Layout>
  );
};
