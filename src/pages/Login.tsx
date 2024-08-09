import Button from '@/components/common/Button';
import Layout from '@/components/Layout';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>로그인</Layout.Header>
      <Layout.Main>
        <div className="flex flex-col items-center h-full">
          {/* <img /> */}
          <div className="w-full">
            <img src="/kakao_login_medium_narrow.png" alt="kakaoButton" />
            <Button
              className="relative flex items-center justify-center w-full border-none rounded-md bg-mainCheeseYellow"
              size="large"
              color="black"
            >
              <SiNaver className="absolute text-2xl text-white left-3" />
              <p>네이버로 시작하기</p>
            </Button>
          </div>
        </div>
      </Layout.Main>
    </Layout>
  );
};

export default Login;
