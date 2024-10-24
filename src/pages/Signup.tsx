import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Button from '@/components/common/Button';
import { useSignup } from '@/hooks/useSignup';
import FormField from '@/components/common/form/FormField';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import NoticeRed from '@/assets/icons/notice_red.svg';
import { useCheckNickname } from '@/components/profile/queries';

const Signup = () => {
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const {
    control,
    watch,
    onSubmit,
    isPending,
  } = useSignup();
  const formValues = watch();
  const nickname = formValues.nickname || '';
  const { checkNickname } = useCheckNickname({ nickname });

  useEffect(() => {
    if (nickname.length > 15) {
      setNicknameError('닉네임은 15자를 초과할 수 없습니다.');
      setIsSubmitEnabled(false);
    } else {
      setNicknameError(null);
      setIsSubmitEnabled(false);
    }
  }, [nickname]);

  const onNicknameCheck = async () => {
    if (!nickname || nickname.trim() === '') {
      setNicknameError('닉네임을 입력해주세요.');
      setIsNameValid(false);
      return;
    }

    const { data } = await checkNickname();
    const { isAvailable } = data;
    
    if (isAvailable === true) {
      setNicknameError('사용 가능한 닉네임입니다.');
      setIsNameValid(true);
      setIsSubmitEnabled(true);
    } else {
      setNicknameError('이미 사용중인 닉네임입니다. 다른 닉네임을 입력해주세요.')
      setIsNameValid(false);
      setIsSubmitEnabled(false);
    }
  };

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  return (
    <Layout>
      <Layout.Header title="회원가입" handleBack={() => navigate('/')} />
      <Layout.Main>
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="flex flex-col px-2 py-4 space-y-4"
        >
          <h2 className="pb-4 text-heading3">기본 정보 입력</h2>
          <div className='flex items-end'>
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
            <div className={`flex items-center gap-2 ${isNameValid ? 'text-customBlue' : 'text-redNotice'}`}>
              {isNameValid ? (
                // 파랑 아이콘 추가
                <img src={NoticeRed} alt="notice_red" className="mb-[2px] size-3" />
              ) : (
                <img src={NoticeRed} alt="notice_red" className="mb-[2px] size-3" />
              )}
              <span className="text-body2">{nicknameError}</span>
            </div>
          )}
          <FormField
            label="자기소개"
            name="bio"
            control={control}
            render={(field) => (
              <Textarea
                id="자기소개"
                placeholder="자기소개를 입력해주세요"
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
          color="cheeseYellow"
          onClick={handleSubmitClick}
          disabled={!isSubmitEnabled || isPending}
          loading={isPending}
        >
          회원 가입 완료
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export default Signup;
