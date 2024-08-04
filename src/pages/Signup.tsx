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
        <div className="w-full">
          <p className="text-gray-600">자기소개</p>
        </div>
        <ProfileInput title="링크" value="" onChange={() => {}} />
      </div>
    </Layout>
  );
};

export default Signup;
