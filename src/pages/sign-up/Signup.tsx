import { Button } from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/FormField';
import { KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from '@/app/layout/ui/Layout';
import { RootState } from '@/app/store';
import type { IUser } from '@/entities/user/user';
import { useSignup } from '@/features/sign-up/hooks';
import { useSignupNicknameValidate } from '@/features/sign-up/hooks/useSignupNicknameValidate';
import { setNicknameError } from '@/features/sign-up/model/signupSlice';
import NoticeBlue from '@/shared/assets/icons/blue_notice.svg';
import NoticeRed from '@/shared/assets/icons/notice_red.svg';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { useNavigate } from 'react-router';

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    nicknameError,
    isNameValid,
    isNicknameChecked,
    isSubmitEnabled,
    isNicknameCheckDisabled
  } = useSelector((state: RootState) => state.signup);

  const { control, watch, isPending, handleSubmit, signupMutation } =
    useSignup();
  const formValues = watch();
  const nickname = formValues.nickname?.trim() || '';
  const { checkNicknameAvailability } = useSignupNicknameValidate({
    nickname
  });

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
          onKeyDown={handleEnterKey}
          className="flex flex-col px-2 py-4 space-y-4"
        >
          <h2 className="pb-4 text-heading3">기본 정보 입력</h2>
          <div className="flex items-end gap-[10px]">
            <div className="flex-1">
              <FormField
                label="닉네임 *"
                name="nickname"
                control={control}
                render={(field) => (
                  <Input
                    id="닉네임 *"
                    type="text"
                    data-testid="nickname-input"
                    placeholder="최대 15글자, 공백 제외"
                    className="focus-visible:ring-cheeseYellow"
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <Button
                ariaLabel="중복 확인"
                type="button"
                className="w-[5rem] web:w-[6.5rem] h-[3.13rem] border-gray2"
                onClick={checkNicknameAvailability}
                disabled={isNicknameCheckDisabled}
              >
                중복확인
              </Button>
            </div>
          </div>
          {nicknameError && (
            <div
              className={`flex items-center gap-2 ${isNameValid ? 'text-customBlue' : 'text-redNotice'}`}
            >
              {isNameValid ? (
                <img
                  src={NoticeBlue}
                  alt="notice_red"
                  className="mb-[2px] size-3"
                />
              ) : (
                <img
                  src={NoticeRed}
                  alt="notice_red"
                  className="mb-[2px] size-3"
                />
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
                data-testid="bio-input"
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
          className="w-full h-[2.94rem] rounded-lg"
          color="cheeseYellow"
          onClick={handleSubmit(onSubmit)}
          disabled={!isSubmitEnabled || isPending}
          loading={isPending}
        >
          회원 가입 완료
        </Button>
      </Layout.Footer>
    </Layout>
  );
};
