import Layout from '@/components/Layout';
import Button from '@/components/common/Button';
import ProfileInput from '@/components/profile/ProfileInput';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>
        프로필 수정
      </Layout.Header>
      <Layout.Main>
        <div className="flex flex-col px-2 py-4 space-y-4">
          <h2 className="pb-4 text-lg font-bold">기본 정보 입력</h2>
          <ProfileInput title="닉네임" value="" />
          <ProfileInput title="지역" value="" />
          <ProfileInput
            title="은행 선택"
            placeholder="은행을 선택해주세요"
            value=""
          />
          <ProfileInput title="계좌번호" value="" />
          <ProfileInput
            title="자기소개"
            placeholder="간단한 자기 소개를 입력해주세요."
            value=""
          />
          <ProfileInput title="링크" placeholder="http://" value="" />
        </div>
      </Layout.Main>
      <Layout.Footer>
        <Button className="w-full h-[47px] rounded-lg" color="cheeseYellow">
          회원 가입 완료
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export default Signup;
