import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Button from '@/components/common/Button';
import SelectBank from '@/components/profile/SelectBank';
import { useSignup } from '@/hooks/useSignup';
import FormField from '@/components/common/form/FormField';
import { Input } from '@/components/ui/input';
import { ChevronDown } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { nicknameCheck } from '@/components/login/queries';
import ErrorMessage from '@/components/common/error/ErrorMessage';

const Signup = () => {
  const [selectBankDisplay, setSelectBankDisplay] = useState('');
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    activeButtonSheet,
    setActiveButtonSheet,
    onCloseBottomSheet,
    onSubmit,
    setError,
  } = useSignup();

  const nickname = watch('nickname');
  const accountNumber = watch('accountNumber');
  const bankname = watch('bankName');


  const { refetch: checkNickname } = useQuery({
    queryKey: [queryKeys.NICKNAME, nickname],
    queryFn: () => nicknameCheck(nickname),
    enabled: false,
  });

  const onNicknameCheck = async () => {
    if (!nickname || nickname.trim() === '') {
      setNicknameError('닉네임을 입력해주세요.');
      return;
    }

    const { data } = await checkNickname();
    const { isAvailable } = data;
    setIsNicknameChecked(isAvailable);
    
    if (isAvailable === true) {
      setNicknameError('사용 가능한 닉네임입니다.')
    } else {
      setNicknameError('이미 사용중인 닉네임입니다.')
    }
  };

  const handleSelectBank = (displayName: string, serverName: string) => {
    setSelectBankDisplay(displayName);
    setValue('bankName', serverName);
    setActiveButtonSheet(false);
  };

  const handleSubmitClick = () => {
    if (!accountNumber || accountNumber.length < 10 || accountNumber.length > 15) {
      setError('accountNumber', {
        message: '계좌번호는 10자리 이상 15자리 이하로 입력해주세요.',
      });
      return;
    }

    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  useEffect(() => {
    if (nickname && bankname && accountNumber && isNicknameChecked) {
      setIsSubmitEnabled(true);
    } else {
      setIsSubmitEnabled(false);
    }
  }, [nickname, bankname, accountNumber, isNicknameChecked])

  return (
    <Layout>
      <Layout.Header title="회원가입" handleBack={() => navigate('/')} />
      <Layout.Main>
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="flex flex-col px-2 py-4 space-y-4"
        >
          <h2 className="pb-4 text-lg font-bold">기본 정보 입력</h2>
          <div className='flex items-end gap-4'>
            <div className='flex-1 w-4/5'>
              <FormField
                label="닉네임 *"
                name="nickname"
                control={control}
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
            </div>
            <div>
              <Button type='button' className='h-10' onClick={onNicknameCheck}>중복확인</Button>
            </div>
          </div>
          {nicknameError && (
            <ErrorMessage message={nicknameError} />
          )}
          <div
            className="relative"
            onClick={() => setActiveButtonSheet(!activeButtonSheet)}
          >
            <FormField
              label="은행 *"
              name="bankName"
              control={control}
              error={errors.bankname?.message}
              render={(field) => (
                <Input
                  id="은행 *"
                  placeholder="은행을 선택해주세요"
                  className="focus-visible:ring-cheeseYellow"
                  {...field}
                  value={selectBankDisplay}
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
              onSelect={handleSelectBank}
            />
          )}
          <FormField
            label="계좌번호 *"
            name="accountNumber"
            control={control}
            error={errors.accountNumber?.message}
            render={(field) => (
              <Input
                id="계좌번호 *"
                type="text"
                placeholder="계좌번호를 입력해주세요"
                className="focus-visible:ring-cheeseYellow"
                {...field}
              />
            )}
          />
          <FormField
            label="자기소개"
            name="bio"
            control={control}
            error={errors.bio?.message}
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
          color={isSubmitEnabled ? 'cheeseYellow' : 'gray2'}
          onClick={handleSubmitClick}
          disabled={!isSubmitEnabled}
        >
          회원 가입 완료
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export default Signup;
