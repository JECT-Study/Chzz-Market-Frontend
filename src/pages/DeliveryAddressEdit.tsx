import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { ADDRESS_SCRIPT_URL } from "@/constants/address";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import FormField from "@/components/common/form/FormField";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { useEditAddress } from "@/components/address/queries";
import { useForm } from "react-hook-form";

interface AddressProps {
  recipientName: string,
  phoneNumber: string,
  zipcode: string,
  roadAddress: string,
  jibun: string,
  detailAddress: string,
}

const DeliveryAddressEdit = () => {
  const navigate = useNavigate();
  const { auctionId } = useParams<{ auctionId: string }>();
  const location = useLocation();
  const addressItem = location.state?.addressItem;
  const roadAddress = location.state?.roadAddress;
  const zonecode = location.state?.zonecode;
  const formRef = useRef<HTMLFormElement>(null);
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => setIsChecked((prev) => !prev)
  const [isVaild, setIsVaild] = useState(false);
  if (!auctionId) {
    return;
  }
  const { mutate } = useEditAddress(auctionId);

  const {
    control,
    watch,
    formState: { errors },
    setValue,
    handleSubmit,
    setError,
  } = useForm<AddressProps>({
    defaultValues: {
      recipientName: addressItem?.recipientName || '',
      phoneNumber: addressItem?.phoneNumber || '',
      zipcode: zonecode ? zonecode : addressItem?.zipcode,
      roadAddress: roadAddress ? roadAddress : addressItem?.roadAddress,
      detailAddress: addressItem?.detailAddress || '',
      jibun: addressItem?.jibun || '',
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
    if (!data.phoneNumber.startsWith("010")) {
      setError("phoneNumber", {
        message: "010으로 시작하는 번호여야 합니다",
      })
    }
    const finalData = {
      ...data,
      isDefault: isChecked,
    };
    mutate({ addressId: addressItem.id, data: finalData });
  });

  const handleOpenAddress = () => {
    new window.daum.Postcode({
      onComplete: (data: any) => {
        const roadAddress = data.address;
        const { zonecode } = data;

        setValue('zipcode', zonecode);
        setValue('roadAddress', roadAddress);

        navigate(`/auctions/${auctionId}/address-edit`, { state: { addressItem: addressItem, roadAddress, zonecode } });
      },
    }).open();
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
      <Layout.Header title="배송지 수정" handleBack={() => navigate('/')} />
      <Layout.Main>
        <div className="flex flex-col">
          <form ref={formRef} className="flex flex-col gap-6" onSubmit={onSubmit}>
            <FormField
              label="이름"
              name="recipientName"
              control={control}
              error={errors.recipientName?.message}
              render={(field) => (
                <Input
                  id="이름"
                  type="text"
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                />
              )}
            />
            <FormField
              label="연락처"
              name="phoneNumber"
              control={control}
              error={errors.phoneNumber?.message}
              render={(field) => (
                <Input
                  id="연락처"
                  type="text"
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                />
              )}
            />
            <div className="flex gap-6 item-center">
              <label className="flex items-center w-[100px] font-bold">우편번호</label>
              <Input
                id="우편번호"
                type="text"
                value={zonecode ? zonecode : addressItem.zipcode}
                className="focus-visible:ring-cheeseYellow bg-gray3"
                readOnly
              />
              <Button type="button" size="small" className="w-[150px] h-[40px]" onClick={handleOpenAddress}>
                우편번호 찾기
              </Button>
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
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
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
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                />
              )}
            />
            <Checkbox title="기본 배송지로 설정" check={isChecked} handleCheck={toggleCheckbox} />
          </form>
        </div>
      </Layout.Main>
      <Layout.Footer type="single">
        <Button
          type="submit"
          className="w-full h-[47px] rounded-lg"
          color={isVaild ? "cheeseYellow" : "gray3"}
          onClick={handleSubmitClick}
          disabled={!isVaild}
        >
          저장하기
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export default DeliveryAddressEdit;