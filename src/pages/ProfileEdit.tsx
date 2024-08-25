import { useState } from 'react';
import Layout from '@/components/Layout';
import Button from '@/components/common/Button';
import ProfileInput from '@/components/profile/ProfileInput';
import SelectCountry from '@/components/profile/SelectCountry';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const ProfileEdit = () => {
  const [profileName, setProfileName] = useState<string>('최대열다섯글자');
  const [profileIntro, setProfileIntro] = useState<string>(
    '안녕하세요. 나이키 직영 조던 정품 취급 전문가입니다.',
  );
  const [profileRegion, setProfileRegion] = useState<string>('서울');
  const [activeButtonSheet, setActiveButtonSheet] = useState(false);
  const [link, setLink] = useState('');
  const { register, watch, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onCloseBottomSheet = () => {
    setActiveButtonSheet(!activeButtonSheet);
  };

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/mypage')}>
        프로필 수정
      </Layout.Header>
      <Layout.Main>
        <div className="flex flex-col px-4 py-6 space-y-4">
          <h2 className="pb-4 text-lg font-bold">프로필 정보</h2>
          <ProfileInput
            title="닉네임"
            value={profileName}
            registerProps={register('nickname', { required: true })}
          />
          <div className="w-full">
            <p className="text-gray-600">자기소개</p>
            <textarea className="w-full py-2 h-[60px] border-b">
              {profileIntro}
            </textarea>
          </div>
          <div className="w-full">
            <p className="text-gray-600">지역</p>
            <div
              className="w-full py-2 h-[40px] border-b hover:cursor-pointer"
              onClick={() => setActiveButtonSheet(!activeButtonSheet)}
            >
              {profileRegion}
            </div>
          </div>
          {activeButtonSheet && (
            <SelectCountry
              onClose={onCloseBottomSheet}
              setProfileRegion={setProfileRegion}
            />
          )}
          <ProfileInput
            title="링크"
            value={link}
            placeholder="http://"
            registerProps={register('link', { required: true })}
          />
        </div>
      </Layout.Main>
      <Layout.Footer>
        <Button
          className="w-full h-[47px] rounded-lg"
          color="cheeseYellow"
          type="submit"
        >
          프로필 수정 완료
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export default ProfileEdit;
