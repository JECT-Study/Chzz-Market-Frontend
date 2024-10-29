import { KeyboardEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Button from '@/components/common/Button';
import { useSignup } from '@/hooks/useSignup';
import FormField from '@/components/common/form/FormField';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import NoticeRed from '@/assets/icons/notice_red.svg';
import NoticeBlue from '@/assets/icons/blue_notice.svg';
import { useCheckNickname } from '@/components/profile/queries';
import { IUser } from '@/@types/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setIsNameValid, setIsNicknameChecked, setIsSubmitEnabled, setNicknameError } from '@/store/signupSlice';


const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const nicknameError = useSelector((state: RootState) => state.signup.nicknameError);
  const isNameValid = useSelector((state: RootState) => state.signup.isNameValid);
  const isNicknameChecked = useSelector((state: RootState) => state.signup.isNicknameChecked);
  const isSubmitEnabled = useSelector((state: RootState) => state.signup.isSubmitEnabled);

  const {
    control,
    watch,
    isPending,
    handleSubmit,
    signupMutation
  } = useSignup();
  const formValues = watch();
  const nickname = formValues.nickname?.trim() || '';
  const { checkNickname } = useCheckNickname({ nickname });

  const validateNickname = () => {
    if (nickname.length > 15) {
      dispatch(setNicknameError('닉네임 15자 미만으로 입력해주세요.'));
      dispatch(setIsNameValid(false));
      dispatch(setIsSubmitEnabled(false));
      return false;
    }
    dispatch(setNicknameError(null));
    dispatch(setIsNameValid(false));
    dispatch(setIsSubmitEnabled(false));
    return true;
  };

  useEffect(() => {
    validateNickname();
  }, [nickname]);

  const onNicknameCheck = async () => {
    if (!validateNickname()) return;

    if (!nickname) {
      dispatch(setNicknameError('닉네임을 입력해주세요.'));
      return;
    }

    const { data } = await checkNickname();
    const { isAvailable } = data;
    
    dispatch(setNicknameError(isAvailable ? '사용 가능한 닉네임입니다.' : '이미 사용중인 닉네임입니다. 다른 닉네임을 입력해주세요.'));
    dispatch(setIsNameValid(isAvailable));
    dispatch(setIsSubmitEnabled(isAvailable));
    dispatch(setIsNicknameChecked(isAvailable));
  };

  const onSubmit = (data: IUser) => {
    if (!isNicknameChecked) {
      dispatch(setNicknameError('닉네임 중복 확인을 해주세요.'));
      return;
    }
    signupMutation(data);
  };

  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !isNicknameChecked) {
      event.preventDefault();
      dispatch(setNicknameError('닉네임 중복 확인을 해주세요.'));
    }
  };


  return (
    <Layout>
      <Layout.Header title="회원가입" handleBack={() => navigate('/')} />
      <Layout.Main>
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={handleEnterKey}
          className="flex flex-col px-2 py-4 space-y-4"
        >
          <h2 className="pb-4 text-heading3">기본 정보 입력</h2>
          <div className='flex items-end gap-[0.63rem]'>
            <div className='flex-1'>
              <FormField
                label="닉네임 *"
                name="nickname"
                control={control}
                render={(field) => (
                  <Input
                    id="닉네임 *"
                    type="text"
                    placeholder="최대 15글자, 공백 제외"
                    className="focus-visible:ring-cheeseYellow"
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <Button type='button' className='w-[5.94rem] h-[3.13rem] border-gray2' onClick={onNicknameCheck}>중복확인</Button>
            </div>
          </div>
          {nicknameError && (
            <div className={`flex items-center gap-2 ${isNameValid ? 'text-customBlue' : 'text-redNotice'}`}>
              {isNameValid ? (
                <img src={NoticeBlue} alt="notice_red" className="mb-[2px] size-3" />
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
          type="button"
          className="w-full h-[47px] rounded-lg"
          color="cheeseYellow"
          onClick={() => formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
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
