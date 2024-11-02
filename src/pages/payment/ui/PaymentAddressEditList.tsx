import type { IAddressDetail } from "@/@types/Address";
import { Layout } from "@/app/layout/index";
import { useDeleteAddress, useGetAddresses } from "@/components/address/queries";
import { Button } from "@/shared";
import rocation_off from '@/shared/assets/icons/rocation_off.svg';
import { ROUTES } from "@/shared/constants/routes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Props extends IAddressDetail {
  id: string;
}

export const PaymentAddressEditList = () => {
  const navigate = useNavigate();
  const { addressData: initialAddressData } = useGetAddresses();
  const { auctionId } = useParams<{ auctionId: string }>();
  const [addressData, setAddressData] = useState(initialAddressData);
  const [selectAddress, setSelectAddress] = useState<Props | null>(null);
  const { deleteData } = useDeleteAddress();
  const addressItems = addressData?.items || [];

  useEffect(() => {
    if (initialAddressData?.items && initialAddressData.items.length > 0) {
      setAddressData(initialAddressData);
      setSelectAddress(initialAddressData.items[0]);
    }
  }, [initialAddressData]);

  const handleDelete = (id: string) => {
    deleteData(id, {
      onSuccess: () => {
        const updatedAddressData = {
          ...addressData,
          items: addressData.items.filter((item: Props) => item.id !== id)
        };
        setAddressData(updatedAddressData);

        if (selectAddress?.id === id) {
          setSelectAddress(updatedAddressData.items[0] || null);
        }
      },
    });
  };
  const handleEdit = (item: Props) => {
    navigate(ROUTES.PAYMENT.ADDRESS.getEditRoute(auctionId!), { state: { addressItem: item } });
  }
  return (
    <Layout>
      <Layout.Header title="주소 편집" />
      <Layout.Main>
        <div>
          <ul>
            {addressItems.map((item: Props) => (
              <li
                key={item.id}
                onClick={() => setSelectAddress(item)}
                className="relative flex gap-4 p-4 mb-4 border-b rounded-md border-gray3"
              >
                <div className="flex items-center">
                  <img src={rocation_off} className="mr-2 text-gray2" alt="위치 아이콘" />
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
                  {item.isDefault ? (
                    <div>
                      <Button type="button" size="small" className="rounded-xl border-gray3" onClick={() => handleEdit(item)}>수정</Button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <Button type="button" size="small" className="rounded-xl border-gray3" onClick={() => handleEdit(item)}>수정</Button>
                      <Button type="button" size="small" className="rounded-xl border-gray3" onClick={() => handleDelete(item.id)}>삭제</Button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Layout.Main>
    </Layout>
  )
};