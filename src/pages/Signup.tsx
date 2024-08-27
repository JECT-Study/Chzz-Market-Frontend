import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Button from '@/components/common/Button';
import SelectBank from '@/components/profile/SelectBank';
import { useSignup } from '@/hooks/useSignup';
import FormField from '@/components/form/FormField';
import { Input } from '@/components/ui/input';
import { ChevronDown } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const Signup = () => {
  const [bank, setBank] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const {
    control,
    watch,
    formState: { errors },
    activeButtonSheet,
    setActiveButtonSheet,
    onCloseBottomSheet,
    onSubmit,
  } = useSignup();

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  const nickname = watch('nickname');
  const Selectbank = watch('bank');
  const accountNumber = watch('accountNumber');

  useEffect(() => {
    setIsFormValid(!!(nickname && Selectbank && accountNumber));
  }, [nickname, Selectbank, accountNumber]);

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>회원가입</Layout.Header>
      <Layout.Main>
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="flex flex-col px-2 py-4 space-y-4"
        >
          <h2 className="pb-4 text-lg font-bold">기본 정보 입력</h2>
          <FormField
            label="닉네임 *"
            name="nickname"
            control={control}
            error={errors.nickname?.message}
            render={(field) => (
              <Input
                id="닉네임 *"
                type="text"
                placeholder="닉네임을 입력해주세요 (공백 제외 15글자 이내)"
                className="focus-visible:ring-cheeseYellow"
                {...field}
              />
            )}
          />
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
            <SelectBank onClose={onCloseBottomSheet} setBank={setBank} />
          )}
          <FormField
            label="계좌번호 *"
            name="accountNumber"
            control={control}
            error={errors.accountNumber?.message}
            render={(field) => (
              <Input
                id="계좌번호 *"
                type="number"
                placeholder="계좌번호를 입력해주세요"
                className="focus-visible:ring-cheeseYellow"
                {...field}
              />
            )}
          />
          <FormField
            label="자기소개"
            name="introduction"
            control={control}
            error={errors.introduction?.message}
            render={(field) => (
              <Textarea
                id="자기소개"
                placeholder="자기소개를 입력해주세요"
                className="focus-visible:ring-cheeseYellow"
                {...field}
              />
            )}
          />
          <FormField
            label="링크"
            name="link"
            control={control}
            error={errors.link?.message}
            render={(field) => (
              <Input
                id="링크"
                type="text"
                placeholder="링크를 입력해주세요"
                className="focus-visible:ring-cheeseYellow"
                {...field}
              />
            )}
          />
        </form>
      </Layout.Main>
      <Layout.Footer type="single">
        <Button
          type="submit"
          className="w-full h-[47px] rounded-lg"
          color={isFormValid ? 'cheeseYellow' : 'gray2'}
          onClick={handleSubmitClick}
        >
          회원 가입 완료
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export default Signup;
