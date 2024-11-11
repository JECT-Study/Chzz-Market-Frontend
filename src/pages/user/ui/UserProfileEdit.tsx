import { setIsNicknameCheckDisabled, setIsNicknameChecked, setIsSubmitEnabled, setNicknameError } from '@/entities/user/model/profileEditSlice';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IUserProfile } from '@/@types/user';
import { Layout } from '@/app/layout/index';
import { RootState } from '@/app/store';
import { Button, FormField } from '@/shared';
import NoticeBlue from '@/shared/assets/icons/blue_notice.svg';
import NoticeRed from '@/shared/assets/icons/notice_red.svg';
import { Input } from '@/shared/shadcn/ui/input';
import { Textarea } from '@/shared/shadcn/ui/textarea';
import { ProfileImageUploader } from '@/features/profile/ui';
import { useCheckNickname } from '@/features/profile/model/useProfile';
import { useEditProfile } from '@/features/profile/hooks';

export const UserProfileEdit = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { control, watch, handleSubmit, handleEditProfile, originalNickname, userProfileImageUrl, isPending } = useEditProfile();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(userProfileImageUrl);
  const [_useDefaultImage, setUseDefaultImage] = useState(false);

  const dispatch = useDispatch();
  const { nicknameError, isNicknameChecked, isSubmitEnabled, isNicknameCheckDisabled } = useSelector((state: RootState) => state.profileEdit);

  const nickname = watch('nickname')?.trim();
  const { checkNickname } = useCheckNickname({ nickname });

  const handleNicknameValidation = (nickname: string, isAvailable: boolean) => {
    if (!nickname || nickname === '') {
      dispatch(setNicknameError('닉네임을 입력해주세요.'));
      dispatch(setIsNicknameChecked(false));
      dispatch(setIsSubmitEnabled(false));
    } else if (isAvailable) {
      dispatch(setNicknameError('사용 가능한 닉네임입니다.'));
      dispatch(setIsNicknameChecked(true));
      dispatch(setIsSubmitEnabled(true));
    } else {
      dispatch(setNicknameError('이미 사용중인 닉네임입니다. 다른 닉네임을 입력해주세요.'));
      dispatch(setIsNicknameChecked(false));
      dispatch(setIsSubmitEnabled(false));
    }
  };

  const onNicknameCheck = async () => {
    if (nickname === originalNickname) {
      dispatch(setNicknameError('기존 닉네임입니다. 사용가능합니다.'));
      dispatch(setIsNicknameChecked(true));
      dispatch(setIsSubmitEnabled(true));
      return;
    }

    const { data } = await checkNickname();
    handleNicknameValidation(nickname, data.isAvailable);
  };

  const onSubmit = (data: IUserProfile) => {
    const { nickname, bio } = data;
    if (isNicknameChecked || nickname === originalNickname) {
      const formData = new FormData();
      const submitData = {
        nickname,
        bio,
        useDefaultImage: !profileFile,
      };

      if (profileFile) {
        formData.append('file', profileFile);
        setUseDefaultImage(false);
      } else {
        setUseDefaultImage(true);
      }
      formData.append('request',
        new Blob([JSON.stringify(submitData)], {
          type: 'application/json',
        })
      );
      handleEditProfile(formData);
    } else {
      dispatch(setNicknameError('닉네임 중복 확인을 해주세요.'));
      dispatch(setIsNicknameChecked(false));
      dispatch(setIsSubmitEnabled(false));
    }
  };

  useEffect(() => {
    if (userProfileImageUrl) {
      setProfileImage(userProfileImageUrl);
    }
  }, [userProfileImageUrl]);

  useEffect(() => {
    if (nickname.length > 15) {
      dispatch(setNicknameError('닉네임 15자 미만으로 입력해주세요.'));
      dispatch(setIsSubmitEnabled(false));
      dispatch(setIsNicknameChecked(false));
      dispatch(setIsNicknameCheckDisabled(true));
    } else {
      dispatch(setNicknameError(''));
      dispatch(setIsNicknameCheckDisabled(false));
      if (nickname === originalNickname) {
        dispatch(setIsSubmitEnabled(true));
      } else {
        dispatch(setIsSubmitEnabled(false));
      }
    }
  }, [nickname]);

  return (
    <Layout>
      <Layout.Header title="프로필 수정" />
      <Layout.Main>
        <form
          ref={formRef}
          className="flex flex-col px-4 py-6 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="pb-4 text-heading3 web:text-heading2">프로필 정보</h2>
          <ProfileImageUploader
            file={profileFile}
            setFile={setProfileFile}
            image={profileImage}
            setImage={setProfileImage}
          />
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
              <Button type='button' className='w-[5rem] web:w-[6.5rem] h-[3.13rem] border-gray2' onClick={onNicknameCheck} disabled={isNicknameCheckDisabled}>중복확인</Button>
            </div>
          </div>
          {nicknameError && (
            <div className={`flex items-center gap-2 ${isNicknameChecked ? 'text-customBlue' : 'text-redNotice'}`}>
              {isNicknameChecked ? (
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
          프로필 수정 완료
        </Button>
      </Layout.Footer>
    </Layout>
  );
};