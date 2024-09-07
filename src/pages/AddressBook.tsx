import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import BlackShose from '@/assets/images/jordan_black.jpeg';
import { z } from 'zod';
import { AddressBookSchema } from '@/constants/schema';
import { useForm } from 'react-hook-form';
import FormField from '@/components/form/FormField';
import { Input } from '@/components/ui/input';
import { ChevronDown } from 'lucide-react';
import SelectBank from '@/components/profile/SelectBank';
import { useState } from 'react';
import Layout from '@/components/layout/Layout';

type FormFields = z.infer<typeof AddressBookSchema>;

const defaultValues = {
  name: '',
  address: '',
  bank: '',
};

const AddressBook = () => {
  const navigate = useNavigate();
  const [bank, setBank] = useState('');
  const [activeButtonSheet, setActiveButtonSheet] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues,
  });

  const onCloseBottomSheet = () => {
    setActiveButtonSheet(!activeButtonSheet);
  };

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>
        배송 정보 입력
      </Layout.Header>
      <Layout.Main>
        <div className="space-y-6">
          {/* 기본 정보 입력 */}
          <div className="p-4 space-y-2 rounded-lg">
            <h2 className="text-lg font-semibold">기본 정보 입력</h2>
            {/* 상품 정보 */}
            <div className="flex items-center p-2 space-x-4">
              <img
                src={BlackShose}
                alt="product"
                className="object-cover rounded-md w-28 h-28 xs:w-24 xs:h-24"
              />
              <div>
                <p className="font-semibold">[나이키] 신발</p>
                <p className="text-sm text-gray-600">시작가 10,000원</p>
                <p className="text-sm text-gray-600">❤️ 30개</p>
              </div>
            </div>
          </div>

          {/* 수령자 정보 입력 */}
          <form className="flex flex-col gap-6">
            <FormField
              label="이름*"
              name="name"
              control={control}
              error={errors.name?.message}
              render={(field) => (
                <Input
                  id="이름*"
                  type="text"
                  placeholder="이름을 입력해주세요."
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                />
              )}
            />
            <div className="relative">
              <FormField
                label="수령지 입력*"
                name="address"
                control={control}
                error={errors.address?.message}
                render={(field) => (
                  <Input
                    id="수령지 입력*"
                    type="text"
                    placeholder="이름을 입력해주세요."
                    className="focus-visible:ring-cheeseYellow"
                    {...field}
                  />
                )}
              />
              <Button
                className="absolute right-1 bottom-[5px]"
                type="button"
                color="white"
                size="small"
              >
                주소 입력
              </Button>
            </div>

            <h3 className="text-heading3">결제 방법</h3>
            <div className="flex space-x-4">
              <Button type="button" className="rounded" color="black">
                무통장 입금
              </Button>
              <Button type="button" className="rounded">
                퀵 계좌결제
              </Button>
            </div>

            <div
              className="relative"
              onClick={() => setActiveButtonSheet(!activeButtonSheet)}
            >
              <FormField
                label="은행 *"
                name="bank"
                control={control}
                error={errors.bank?.message}
                render={(field) => (
                  <Input
                    id="은행 *"
                    placeholder="은행을 선택해주세요"
                    className="focus-visible:ring-cheeseYellow"
                    {...field}
                    value={bank}
                  />
                )}
              />
              <ChevronDown
                className="text-gray-400 text-2xl absolute right-2 bottom-2.5"
                data-testid="bank-dropdown-icon"
              />
            </div>
            {activeButtonSheet && (
              <SelectBank
                onClose={onCloseBottomSheet}
                onSelect={(el) => setBank(el)}
              />
            )}
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="receipt" className="mr-2" />
                <label htmlFor="receipt" className="text-sm">
                  현금 영수증 신청
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="agree" className="mr-2" />
                <label htmlFor="agree" className="text-sm">
                  주의사항을 모두 확인하였으며 위 내용에 동의합니다.
                </label>
              </div>
            </div>
          </form>
        </div>
      </Layout.Main>
      <Layout.Footer type="single">
        <Button
          type="submit"
          className="w-full h-[47px] rounded-lg"
          color="cheeseYellow"
        >
          입력 완료
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export default AddressBook;
