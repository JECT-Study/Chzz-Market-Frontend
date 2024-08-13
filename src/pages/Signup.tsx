import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Button from '@/components/common/Button';
import ProfileInput from '@/components/profile/ProfileInput';
import { FaCaretDown } from 'react-icons/fa6';
import SelectBank from '@/components/profile/SelectBank';

const Signup = () => {
  const [nickname, setNickname] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [bank, setBank] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [activeButtonSheet, setActiveButtonSheet] = useState(false);
  const navigate = useNavigate();

  const onCloseBottomSheet = () => {
    setActiveButtonSheet(!activeButtonSheet);
  };

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>회원가입</Layout.Header>
      <Layout.Main>
        <div className="flex flex-col px-2 py-4 space-y-4">
          <h2 className="pb-4 text-lg font-bold">기본 정보 입력</h2>
          <ProfileInput
            title="닉네임 *"
            placeholder="닉네임을 입력해주세요 (공백 제외 15글자 이내)"
            value={nickname}
            onChange={setNickname}
            required
          />
          <ProfileInput
            title="지역 *"
            placeholder="지역을 입력해주세요."
            value={region}
            onChange={setRegion}
            required
          />
          <div className="relative">
            <ProfileInput
              title="은행 선택"
              placeholder="은행을 선택해주세요"
              value={bank}
              onChange={setBank}
            />
            <FaCaretDown
              className="text-gray-400 text-2xl absolute right-2 bottom-2.5"
              data-testid="bank-dropdown-icon"
              onClick={() => setActiveButtonSheet(!activeButtonSheet)}
            />
          </div>
          {activeButtonSheet && <SelectBank onClose={onCloseBottomSheet} />}
          <ProfileInput
            title="계좌번호"
            placeholder="계좌번호를 입력해주세요."
            value={accountNumber}
            onChange={setAccountNumber}
          />
          <ProfileInput
            title="자기소개 *"
            placeholder="간단한 자기 소개를 입력해주세요."
            value={introduction}
            onChange={setIntroduction}
            required
          />
          <ProfileInput
            title="링크"
            placeholder="http://"
            value={link}
            onChange={setLink}
          />
        </div>
      </Layout.Main>
      <Layout.Footer>
        <Button
          className="w-full h-[47px] rounded-lg"
          color={nickname && region && introduction ? 'cheeseYellow' : 'gray2'}
        >
          회원 가입 완료
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export default Signup;
