import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import Button from '@/components/common/Button';
import ProfileInput from '@/components/profile/ProfileInput';

const SignupFooter = () => {
  return (
    <Footer>
      <Button className="w-full h-[47px] rounded-lg" color="cheeseYellow">
        회원 가입 완료
      </Button>
    </Footer>
  );
};

const Signup = () => {
  return (
    <Layout
      header={<Header path="/">프로필 수정</Header>}
      footer={<SignupFooter />}
    >
      <div className="flex flex-col px-2 py-4 space-y-4">
        <h2 className="text-lg font-bold pb-4">기본 정보 입력</h2>
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
    </Layout>
  );
};

export default Signup;
