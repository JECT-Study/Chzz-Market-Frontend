import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Layout } from "@/app/layout/index";
import { ADDRESS_SCRIPT_URL } from "@/features/address/config/address";
import { Button, Checkbox, FormField } from "@/shared";
import { Input } from "@/shared/shadcn/ui/input";
import { formatPhoneNumber } from "@/shared/utils/formatPhoneNumber";
import { useForm } from "react-hook-form";
import { usePostAddress } from "@/features/address/model";

interface AddressProps {
  recipientName: string,
  phoneNumber: string,
  zipcode: string,
  roadAddress: string,
  jibun: string,
  detailAddress: string,
}

export const PaymentAddressAdd = () => {
  const navigate = useNavigate();
  const { auctionId } = useParams<{ auctionId: string }>();
  const location = useLocation();
  const { roadAddress, zonecode, jibunAddress } = location.state;
  const formRef = useRef<HTMLFormElement>(null);
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => setIsChecked((prev) => !prev)
  const [isVaild, setIsVaild] = useState(false);
  if (!auctionId) {
    return;
  }
  const { mutate, isPending } = usePostAddress(auctionId);

  const {
    control,
    watch,
    formState: { errors },
    setValue,
    handleSubmit,
    setError,
  } = useForm<AddressProps>({
    defaultValues: {
      recipientName: '',
      phoneNumber: '',
      zipcode: zonecode,
      roadAddress: roadAddress,
      detailAddress: '',
      jibun: jibunAddress,
    }
  });
  const recipientName = watch('recipientName');
  const phoneNumber = watch('phoneNumber');
  const detailAddress = watch('detailAddress');

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  const onSubmit = handleSubmit((data: AddressProps) => {
    let hasError = false;
    if (!data.phoneNumber.startsWith("010") || data.phoneNumber.length > 13) {
      setError("phoneNumber", {
        message: "휴대폰 번호는 010으로 시작하고 11자리로 입력해주세요.",
      });
    }
    if (!data.recipientName.trim()) {
      setError("recipientName", {
        type: "manual",
        message: "이름을 입력해주세요.",
      });
      hasError = true;
    }

    if (!data.roadAddress.trim()) {
      setError("roadAddress", {
        type: "manual",
        message: "주소지를 입력해주세요.",
      });
      hasError = true;
    }

    if (!data.detailAddress.trim()) {
      setError("detailAddress", {
        type: "manual",
        message: "상세주소를 입력해주세요.",
      });
      hasError = true;
    }
    if (!hasError) {
      const finalData = {
        ...data,
        isDefault: isChecked,
      };
      mutate(finalData);
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

        navigate(`/auctions/${auctionId}/address-add`, { state: { roadAddress, zonecode, jibunAddress } });
      },
    }).open({
      left,
      top,
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = ADDRESS_SCRIPT_URL
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
      <Layout.Header title="배송지 추가" />
      <Layout.Main>
        <div className="flex flex-col">
          <form ref={formRef} className="flex flex-col gap-6" onSubmit={onSubmit}>
            <FormField
              label="이름 *"
              name="recipientName"
              control={control}
              error={errors.recipientName?.message}
              render={(field) => (
                <Input
                  id="이름"
                  type="text"
                  aria-label="이름 *"
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                />
              )}
            />
            <FormField
              label="휴대폰 번호 *"
              name="phoneNumber"
              control={control}
              error={errors.phoneNumber?.message}
              render={(field) => (
                <Input
                  id="휴대폰 번호"
                  type="text"
                  aria-label="휴대폰 번호 *"
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                />
              )}
            />
            <div className="flex gap-2 item-center">
              <div className="flex items-center">
                <label className="flex items-center w-[3.95rem] text-body2 web:text-body1">우편번호</label>
              </div>
              <Input
                id="우편번호 *"
                type="text"
                aria-label="우편번호 *"
                value={zonecode}
                className="focus-visible:ring-cheeseYellow bg-gray3"
                readOnly
              />
              <div>
                <Button type="button" className="w-[6rem] h-[3.12rem] web:w-[9rem] border-gray3" onClick={handleOpenAddress}>
                  우편번호 찾기
                </Button>
              </div>
            </div>
            <FormField
              label="주소지 *"
              name="roadAddress"
              control={control}
              error={errors.roadAddress?.message}
              render={(field) => (
                <Input
                  id="주소지"
                  type="text"
                  aria-label="주소지 *"
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                  readOnly
                />
              )}
            />
            <FormField
              label="상세주소 *"
              name="detailAddress"
              control={control}
              error={errors.detailAddress?.message}
              render={(field) => (
                <Input
                  id="상세주소"
                  type="text"
                  aria-label="상세주소 *"
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                />
              )}
            />
            {/* 기본 배송지 체크박스는 직접 처리 */}
            <Checkbox title="기본 배송지로 설정" check={isChecked} handleCheck={toggleCheckbox} />
          </form>
        </div>
      </Layout.Main>
      <Layout.Footer type="single">
        <Button
          type="button"
          className="w-full h-[47px] rounded-lg"
          color={isVaild ? "cheeseYellow" : "gray3"}
          onClick={handleSubmitClick}
          disabled={!isVaild || isPending}
          loading={isPending}
        >
          저장하기
        </Button>
      </Layout.Footer>
    </Layout>
  );
};