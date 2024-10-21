import Button from "@/components/common/Button";
import Layout from "@/components/layout/Layout";
import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";

interface Props {
  name: string,
  phone: string,
  zonecode: string,
  address: string,
  addressDetail: string,
  defaultAddress: boolean,
}

const addressList = [
  {
    name: '김철수',
    phone: '010-1234-5678',
    zonecode: '12345',
    address: '서울특별시 중구 회현동 소공로 51',
    addressDetail: '세인빌딩 1층 102호',
    defaultAddress: true,
  },
  {
    name: '김영희',
    phone: '010-6789-5678',
    zonecode: '67890',
    address: '서울특별시 중구 회현동 소공로 51',
    addressDetail: '세인빌딩 1층 102호',
    defaultAddress: false,
  },
  {
    name: '김영희',
    phone: '010-6789-5678',
    zonecode: '12523',
    address: '서울특별시 중구 회현동 소공로 51',
    addressDetail: '세인빌딩 1층 102호',
    defaultAddress: false,
  },
];

const DeliveryAddressList = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const { auctionId } = useParams<{ auctionId: string}>();
  const [selectAddress, setSelectAddress] = useState<Props>();

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
        const jibunAddress = data.jibunAddress;
        const { zonecode } = data;

        navigate(`/auctions/${auctionId}/address-add`, { state: {roadAddress: roadAddress, zonecode: zonecode, jibunAddress: jibunAddress }});
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = import.meta.env.VITE_SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    const defaultAddress = addressList.find(item => item.defaultAddress === true);
    if (defaultAddress) {
      setSelectAddress(defaultAddress);
    }

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Layout>
      <Layout.Header title="배송지 목록" handleBack={() => navigate('/')} />
      <Layout.Main>
        <div>
          <div className="flex flex-col pt-10 gap-5">
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
              <li
                key={item.zonecode}
                onClick={() => setSelectAddress(item)}
                className={`relative flex p-4 rounded-md mb-4 cursor-pointer border
                ${selectAddress?.zonecode === item.zonecode ? 'border-cheeseYellow' : 'border-white'}`}
              >
                <div className="flex items-center">
                  {selectAddress?.zonecode === item.zonecode ? (
                    <span className="text-cheeseYellow mr-2">📍</span>
                  ) : (
                    <span className="text-gray2 mr-2">📍</span>
                  )}
                </div>
                <div className="flex flex-col gap-2 mb-2">
                  {item.defaultAddress && (
                    <span className="text-cheeseYellow text-body2 font-semibold">기본배송지</span>
                  )}
                  <span className="font-bold">{item.name} / {item.phone}</span>
                  <div className="text-gray2">
                    <p>{item.address}</p>
                    <p>{item.addressDetail}</p>
                  </div>
                </div>
                <div className="absolute right-4 top-16">
                  {selectAddress?.zonecode === item.zonecode && <FaCheck />}
                </div>
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