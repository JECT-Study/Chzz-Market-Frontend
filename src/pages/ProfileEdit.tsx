import Layout from '@/components/layout/Layout';
import Button from '@/components/common/Button';
import FormField from '@/components/common/form/FormField';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRef } from 'react';
import { useEditProfile } from '@/hooks/useProfile';
import { UserProfile } from '@/@types/user';

const ProfileEdit = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const { control, handleSubmit, handleEditProfile } = useEditProfile();

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  const onSubmit = (data: UserProfile) => {
    handleEditProfile(data);
  };

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
          <FormField
            label="링크"
            name="link"
            control={control}
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
          color="cheeseYellow"
          onClick={handleSubmitClick}
        >
          프로필 수정 완료
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export default ProfileEdit;
