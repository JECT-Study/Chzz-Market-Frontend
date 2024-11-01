import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { IAddressDetail } from "@/@types/Address";
import { Layout } from "@/app/layout/index";
import { useGetAddresses } from "@/components/address/queries";
import { ADDRESS_SCRIPT_URL } from "@/constants/address";
import { Button } from "@/shared";
import rocation_off from '@/shared/assets/icons/rocation_off.svg';
import rocation_on from '@/shared/assets/icons/rocation_on.svg';
import { ROUTES } from "@/shared/constants/routes";
import { FaCheck } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";

interface Props extends IAddressDetail {
  id: string;
}

export const PaymentAddressList = () => {
  const navigate = useNavigate();
  const { auctionId } = useParams<{ auctionId: string }>();
  const { addressData: initialAddressData } = useGetAddresses();
  const [addressData, setAddressData] = useState(initialAddressData);
  const [selectAddress, setSelectAddress] = useState<Props | null>(null);
  const addressItems = addressData?.items || [];

  useEffect(() => {
    if (initialAddressData?.items && initialAddressData.items.length > 0) {
      setAddressData(initialAddressData);
      setSelectAddress(initialAddressData.items[0]);
    }
  }, [initialAddressData]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = ADDRESS_SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmitClick = () => {
    if (auctionId) {
      navigate(ROUTES.PAYMENT.getRoute(auctionId), { state: { address: selectAddress }, replace: true });
    }
  };

  const handleEditButtonClick = () => {
    if (auctionId) {
      navigate(ROUTES.PAYMENT.ADDRESS.getEditListRoute(auctionId))
    }
  }

  const handleOpenAddress = () => {
    const popupWidth = 500;
    const popupHeight = 600;

    const left = window.innerWidth / 2 - popupWidth / 2 + window.screenLeft;
    const top = window.innerHeight / 2 - popupHeight / 2 + window.screenTop;

    new window.daum.Postcode({
      width: popupWidth,
      height: popupHeight,
      onComplete: (data: any) => {
        const roadAddress = data.address;
        const jibunAddress = data.jibunAddress;
        const { zonecode } = data;
        if (auctionId) {
          navigate(ROUTES.PAYMENT.ADDRESS.getAddRoute(auctionId), { state: { roadAddress, zonecode, jibunAddress } });
        }
      },
    }).open({
      left,
      top,
    });
  };

  return (
    <Layout>
      <Layout.Header title="배송지 목록" />
      <span className="absolute text-xl cursor-pointer top-3 right-5" onClick={handleEditButtonClick}>편집</span>
      <Layout.Main>
        <div>
          <div className="flex flex-col gap-5 pt-10">
            <h1 className="text-2xl font-semibold">배송지 추가</h1>
            <div onClick={handleOpenAddress} className="relative flex items-center w-full">
              <IoIosSearch className="absolute left-3 text-muted-foreground" />
              <input
                type="text"
                className='flex h-[50px] w-full pl-10 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer'
                autoComplete="off"
                placeholder="지번, 도로명, 건물명으로 검색"
              />
            </div>
          </div>
          <div>
            <div className="border-b-8 border-gray-100 ml-[-32px] mr-[-32px] my-5" />
            <ul>
              {addressItems.map((item: Props) => (
                <li
                  key={item.id}
                  onClick={() => setSelectAddress(item)}
                  className={`relative flex p-4 rounded-md mb-4 gap-4 cursor-pointer
                ${selectAddress?.id === item.id ? 'border border-cheeseYellow' : 'border border-white border-b-gray3'}`}
                >
                  <div className="flex items-center">
                    {item?.isDefault ? (
                      <img src={rocation_on} className="mr-2 text-cheeseYellow" alt="위치 아이콘" />
                    ) : (
                      <img src={rocation_off} className="mr-2 text-gray2" alt="위치 아이콘" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 mb-2">
                    {item.isDefault && (
                      <span className="font-semibold text-cheeseYellow text-body2">기본배송지</span>
                    )}
                    <span className="font-bold">{item.recipientName} / {item.phoneNumber}</span>
                    <div className="text-gray2">
                      <p>{item.roadAddress}</p>
                      <p>{item.detailAddress}</p>
                    </div>
                  </div>
                  <div className={`absolute ${selectAddress?.id === item.id ? 'right-4 top-16' : 'right-4 top-14'}`}>
                    {selectAddress?.id === item.id && <FaCheck />}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout.Main>
      <Layout.Footer type="single">
        <Button
          type="button"
          className="w-full h-[47px] rounded-lg"
          color="cheeseYellow"
          onClick={handleSubmitClick}
        >
          배송지 선택 완료
        </Button>
      </Layout.Footer>
    </Layout>
  );
};