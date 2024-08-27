import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Button from '@/components/common/Button';
import ProfileInput from '@/components/profile/ProfileInput';
import { FaCaretDown } from 'react-icons/fa6';
import SelectBank from '@/components/profile/SelectBank';
import { useSignup } from '@/hooks/useSignup';

const Signup = () => {
  const [bank, setBank] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const {
    register,
    errors,
    watch,
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
  const region = watch('region');
  const introduction = watch('introduction');

  const isFormValid = nickname && region && introduction;

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
          <ProfileInput
            title="닉네임 *"
            placeholder="닉네임을 입력해주세요 (공백 제외 15글자 이내)"
            registerProps={register('nickname', { required: true })}
            error={errors.nickname}
          />
          <div className="relative">
            <ProfileInput
              title="은행 선택"
              value={bank}
              placeholder="은행을 선택해주세요"
              registerProps={register('bank')}
            />
            <FaCaretDown
              className="text-gray-400 text-2xl absolute right-2 bottom-2.5"
              data-testid="bank-dropdown-icon"
              onClick={() => setActiveButtonSheet(!activeButtonSheet)}
            />
          </div>
          {activeButtonSheet && (
            <SelectBank onClose={onCloseBottomSheet} setBank={setBank} />
          )}
          <ProfileInput
            title="계좌번호"
            placeholder="계좌번호를 입력해주세요."
            registerProps={register('accountNumber')}
          />
          <ProfileInput
            title="자기소개 *"
            placeholder="간단한 자기 소개를 입력해주세요."
            registerProps={register('introduction', { required: true })}
            error={errors.introduction}
          />
          <ProfileInput
            title="링크"
            placeholder="http://"
            registerProps={register('link')}
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
