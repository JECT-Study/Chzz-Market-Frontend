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
            <Button
              className="relative flex items-center justify-center w-full mb-3 border-none rounded-md bg-mainCheeseYellow"
              size="large"
              color="white"
            >
              <RiKakaoTalkFill className="absolute text-2xl left-3" />
              <p>카카오톡으로 시작하기</p>
            </Button>
            <Button
              className="relative flex items-center justify-center w-full border-none rounded-md bg-mainCheeseYellow"
              size="large"
              color="white"
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
