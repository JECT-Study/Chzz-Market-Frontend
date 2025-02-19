import { Button, Checkbox, FormField, useToggleState } from '@/shared';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { Layout } from '@/app/layout/index';
import { ADDRESS_SCRIPT_URL } from '@/features/address/config/address';
import { useEditAddress } from '@/features/address/model';
import { ROUTES } from '@/shared/constants/routes';
import { Input } from '@/shared/ui/input';
import { formatPhoneNumber } from '@/shared/utils/formatPhoneNumber';
import { useForm } from 'react-hook-form';

interface AddressProps {
  recipientName: string;
  phoneNumber: string;
  zipcode: string;
  roadAddress: string;
  jibun: string;
  detailAddress: string;
}

export const PaymentAddressEdit = () => {
  const navigate = useNavigate();
  const { auctionId } = useParams<{ auctionId: string }>();
  const location = useLocation();
  const addressItem = location.state?.addressItem;
  const roadAddress = location.state?.roadAddress;
  const zonecode = location.state?.zonecode;
  const [isChecked, toggleCheck] = useToggleState(addressItem.isDefault);
  const [isVaild, setIsVaild] = useState(false);
  if (!auctionId) {
    return;
  }
  const { mutate, isPending } = useEditAddress(auctionId);

  const {
    control,
    watch,
    formState: { errors },
    setValue,
    handleSubmit,
    setError
  } = useForm<AddressProps>({
    defaultValues: {
      recipientName: addressItem?.recipientName || '',
      phoneNumber: addressItem?.phoneNumber || '',
      zipcode: zonecode || addressItem?.zipcode,
      roadAddress: roadAddress || addressItem?.roadAddress,
      detailAddress: addressItem?.detailAddress || '',
      jibun: addressItem?.jibun || ''
    }
  });

  const recipientName = watch('recipientName');
  const phoneNumber = watch('phoneNumber');
  const detailAddress = watch('detailAddress');

  const onSubmit = handleSubmit((data: AddressProps) => {
    let hasError = false;
    if (!data.phoneNumber.startsWith('010') || data.phoneNumber.length > 13) {
      setError('phoneNumber', {
        message: '휴대폰 번호는 010으로 시작하고 11자리로 입력해주세요.'
      });
    }
    if (!data.recipientName.trim()) {
      setError('recipientName', {
        type: 'manual',
        message: '이름을 입력해주세요.'
      });
      hasError = true;
    }

    if (!data.roadAddress.trim()) {
      setError('roadAddress', {
        type: 'manual',
        message: '주소지를 입력해주세요.'
      });
      hasError = true;
    }

    if (!data.detailAddress.trim()) {
      setError('detailAddress', {
        type: 'manual',
        message: '상세주소를 입력해주세요.'
      });
      hasError = true;
    }
    if (!hasError) {
      const finalData = {
        ...data,
        isDefault: isChecked
      };
      mutate({ addressId: addressItem.id, data: finalData });
    }
  });

  const handleOpenAddress = () => {
    const popupWidth = 500;
    const popupHeight = 600;

    // 현재 모니터의 중앙을 기준으로 팝업 위치 계산
    const left = window.innerWidth / 2 - popupWidth / 2 + window.screenLeft;
    const top = window.innerHeight / 2 - popupHeight / 2 + window.screenTop;

    new window.daum.Postcode({
      width: popupWidth,
      height: popupHeight,
      onComplete: (data: any) => {
        const roadAddress = data.address;
        const { zonecode } = data;

        setValue('zipcode', zonecode);
        setValue('roadAddress', roadAddress);

        navigate(ROUTES.PAYMENT.ADDRESS.getEditRoute(auctionId), {
          state: { addressItem, roadAddress, zonecode }
        });
      }
    }).open({
      left,
      top
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = ADDRESS_SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    setValue('phoneNumber', formattedPhoneNumber);
    if (recipientName && phoneNumber && detailAddress) {
      setIsVaild(true);
    }
  }, [phoneNumber, setValue, detailAddress, recipientName]);

  return (
    <Layout>
      <Layout.Header title="배송지 수정" />
      <Layout.Main>
        <div className="flex flex-col">
          <form
            className="flex flex-col gap-6"
          >
            <FormField
              label="이름"
              name="recipientName"
              control={control}
              error={errors.recipientName?.message}
              render={(field) => (
                <Input
                  id="이름"
                  type="text"
                  aria-label="이름"
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                />
              )}
            />
            <FormField
              label="휴대폰 번호"
              name="phoneNumber"
              control={control}
              error={errors.phoneNumber?.message}
              render={(field) => (
                <Input
                  id="휴대폰 번호"
                  type="text"
                  aria-label="휴대폰 번호"
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                />
              )}
            />
            <div className="flex gap-2 item-center">
              <div className="flex items-center">
                <label className="flex items-center w-[3.95rem] text-body2 web:text-body1">
                  우편번호
                </label>
              </div>
              <Input
                id="우편번호 *"
                type="text"
                aria-label="우편번호"
                value={zonecode || addressItem.zipcode}
                className="focus-visible:ring-cheeseYellow bg-gray3"
                readOnly
              />
              <div>
                <Button
                  type="button"
                  className="w-[6rem] h-[3.12rem] web:w-[9rem] border-gray3"
                  onClick={handleOpenAddress}
                >
                  우편번호 찾기
                </Button>
              </div>
            </div>
            <FormField
              label="주소지"
              name="roadAddress"
              control={control}
              error={errors.roadAddress?.message}
              render={(field) => (
                <Input
                  id="주소지"
                  type="text"
                  aria-label="주소지"
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                  readOnly
                />
              )}
            />
            <FormField
              label="상세주소"
              name="detailAddress"
              control={control}
              error={errors.detailAddress?.message}
              render={(field) => (
                <Input
                  id="상세주소"
                  type="text"
                  aria-label="상세주소"
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                />
              )}
            />
            <Checkbox
              title="기본 배송지로 설정"
              check={isChecked}
              toggle={toggleCheck}
            />
          </form>
        </div>
      </Layout.Main>
      <Layout.Footer type="single">
        <Button
          type="button"
          className="w-full h-[47px] rounded-lg"
          color={isVaild ? 'cheeseYellow' : 'gray3'}
          onClick={onSubmit}
          disabled={!isVaild || isPending}
          loading={isPending}
        >
          저장하기
        </Button>
      </Layout.Footer>
    </Layout>
  );
};
