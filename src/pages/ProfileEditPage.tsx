import { useState } from 'react';
import Layout from '@/components/Layout';
import Button from '@/components/common/Button';
import ProfileInput from '@/components/profile/ProfileInput';
import Header from '@/components/Header';
import SelectCountry from '@/components/profile/SelectCountry';
import Footer from '@/components/Footer';

const ProfileEditPageFooter = (
  <Footer>
    <Button className="w-full h-[47px] rounded-lg" color="cheeseYellow">
      프로필 수정 완료
    </Button>
  </Footer>
);

const ProfileEditPage = () => {
  const [profileName, setProfileName] = useState<string>('최대열다섯글자');
  const [profileIntro, setProfileIntro] = useState<string>(
    '안녕하세요. 나이키 직영 조던 정품 취급 전문가입니다.',
  );
  const [profileRegion, setProfileRegion] = useState<string>('서울');
  const [activeButtonSheet, setActiveButtonSheet] = useState(false);
  const [link, setLink] = useState('');

  const onCloseBottomSheet = () => {
    setActiveButtonSheet(!activeButtonSheet);
  };

  return (
    <Layout
      header={<Header path="/">프로필 수정</Header>}
      footer={ProfileEditPageFooter}
    >
      <div className="flex flex-col px-2 py-4 space-y-4">
        <h2 className="text-lg font-bold pb-4">프로필 정보</h2>
        <ProfileInput title="닉네임" value={profileName} onChange={() => {}} />
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
            onClick={() => setActiveButtonSheet(!activeButtonSheet)}
          >
            {profileRegion}
          </div>
        </div>
        {activeButtonSheet && <SelectCountry onClose={onCloseBottomSheet} />}
        <ProfileInput
          title="링크"
          value={link}
          placeholder="http://"
          onChange={() => {}}
        />
      </div>
    </Layout>
  );
};

export default ProfileEditPage;
