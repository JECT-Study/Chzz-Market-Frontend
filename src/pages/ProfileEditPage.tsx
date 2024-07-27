import { useState } from 'react';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import Button from '@/components/common/Button';
import ProfileInput from '@/components/profile/ProfileInput';
import SelectRegion from '@/components/profile/SelectRegion';

const ProfileEditPage = () => {
  const [profileName, setProfileName] = useState<string>('최대열다섯글자');
  const [profileIntro, setProfileIntro] = useState<string>(
    '안녕하세요. 나이키 직영 조던 정품 취급 전문가입니다.',
  );
  const [profileRegion, setProfileRegion] = useState<string>('서울');
  const [activeButtonSheet, setActiveButtonSheet] = useState(false);
  const [link, setLink] = useState('');

  const onCloseBottomSheet = () => {
    setActiveButtonSheet(false);
  };

  return (
    <Layout header="프로필 수정" footer={<Footer />}>
      <div className="flex flex-col items-center px-4 py-6 space-y-4">
        <div className="w-20 h-20 bg-gray-300 rounded-full" />
        <h2 className="text-lg font-bold">프로필 정보</h2>
        <ProfileInput
          title="프로필 이름"
          value={profileName}
          onChange={() => {}}
        />
        <div className="w-full">
          <p className="text-gray-600">자기소개</p>
          <textarea className="w-full py-2 h-[60px] border-b" rows={2}>
            {profileIntro}
          </textarea>
        </div>
        <div className="w-full">
          <p className="text-gray-600">지역</p>
          <div
            className="w-full py-2 h-[40px] border-b hover:cursor-pointer"
            onClick={() => setActiveButtonSheet(true)}
          >
            {profileRegion}
          </div>
        </div>
        {activeButtonSheet && <SelectRegion onClose={onCloseBottomSheet} />}
        <ProfileInput
          title="링크"
          value={link}
          placeholder="http://"
          onChange={() => {}}
        />
        <Button className="w-full h-[47px] rounded-lg" color="black">
          프로필 수정 완료
        </Button>
      </div>
    </Layout>
  );
};

export default ProfileEditPage;
