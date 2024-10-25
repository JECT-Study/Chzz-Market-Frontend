import Layout from '@/components/layout/Layout';
import Button from '@/components/common/Button';
import FormField from '@/components/common/form/FormField';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useRef, useState } from 'react';
import { useEditProfile } from '@/hooks/useProfile';
import { IUserProfile } from '@/@types/user';
import ProfileImageUploader from '@/components/profile/ProfileImageUploader';
import NoticeRed from '@/assets/icons/notice_red.svg';
import NoticeBlue from '@/assets/icons/blue_notice.svg';
import { useCheckNickname } from '@/components/profile/queries';

const ProfileEdit = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const { control, watch, handleSubmit, handleEditProfile, originalNickname, userProfileImageUrl, isPending } = useEditProfile();
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(userProfileImageUrl);
  const [_useDefaultImage, setUseDefaultImage] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isNicknameCheckDisabled, setIsNicknameCheckDisabled] = useState(false);
  const nickname = watch('nickname')?.trim();
  const { checkNickname } = useCheckNickname({ nickname });

  const handleNicknameValidation = (nickname: string, isAvailable: boolean) => {
    if (!nickname || nickname === '') {
      setNicknameError('닉네임을 입력해주세요.');
      setIsNicknameChecked(false);
      setIsSubmitEnabled(false);
    } else if (isAvailable) {
      setNicknameError('사용 가능한 닉네임입니다.');
      setIsNicknameChecked(true);
      setIsSubmitEnabled(true);
    } else {
      setNicknameError('이미 사용중인 닉네임입니다. 다른 닉네임을 입력해주세요.');
      setIsNicknameChecked(false);
      setIsSubmitEnabled(false);
    }
  };

  const onNicknameCheck = async () => {
    if (nickname === originalNickname) {
      setNicknameError('기존 닉네임입니다. 사용가능합니다.');
      setIsNicknameChecked(true);
      setIsSubmitEnabled(true);
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
      setNicknameError('닉네임 중복 확인을 해주세요.');
      setIsNicknameChecked(false);
      setIsSubmitEnabled(false);
    }
  };

  useEffect(() => {
    if (userProfileImageUrl) {
      setProfileImage(userProfileImageUrl);
    }
  }, [userProfileImageUrl]);

  useEffect(() => {
    if (nickname.length > 15) {
      setNicknameError('닉네임 15자 미만으로 입력해주세요.');
      setIsSubmitEnabled(false);
      setIsNicknameChecked(false);
      setIsNicknameCheckDisabled(true);
    } else {
      setIsNicknameCheckDisabled(false);
      if (nickname === originalNickname) {
        setIsSubmitEnabled(true);
      } else {
        setIsSubmitEnabled(false);
      }
    }
  }, [nickname]);

  return (
    <Layout>
      <Layout.Header title="프로필 수정" handleBack={() => navigate('/user')} />
      <Layout.Main>
        <form
          ref={formRef}
          className="flex flex-col px-4 py-6 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="pb-4 text-lg font-bold">프로필 정보</h2>
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
              <Button type='button' className='h-10' onClick={onNicknameCheck} disabled={isNicknameCheckDisabled}>중복확인</Button>
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

export default ProfileEdit;
