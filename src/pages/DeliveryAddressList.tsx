import { useEffect, useRef } from "react";

import Button from "@/components/common/Button";
import Layout from "@/components/layout/Layout";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const addressList = [
  {
    zonecode: '12345',
    address: '서울특별시 중구 회현동 소공로 51',
    addressDetail: '세인빌딩 1층 102호',
    defaultAddress: true,
  },
  {
    zonecode: '67890',
    address: '경기도 수원시 장안구 영화동 320-2',
    addressDetail: '프라이어상가 B동 203호',
    defaultAddress: false,
  },
  {
    zonecode: '12523',
    address: '경기도 수원시 장안동 영화동 320-2',
    addressDetail: '프라이어상가 B동 203호',
    defaultAddress: false,
  },
]

const DeliveryAddressList = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  const handleOpenAddress = () => {
    new window.daum.Postcode({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onComplete: (data: any) => {
        const roadAddress = data.address;
        const { zonecode } = data;

        navigate('/auctions/address-add', { state: { roadAddress: roadAddress, zonecode: zonecode } });
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = import.meta.env.VITE_SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Layout>
      <Layout.Header title="배송지 목록" handleBack={() => navigate('/')} />
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
              {addressList.map(item => (
                <li key={item.zonecode}>
                  hi
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout.Main>
      <Layout.Footer type="single">
        <Button
          type="submit"
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

export default DeliveryAddressList;