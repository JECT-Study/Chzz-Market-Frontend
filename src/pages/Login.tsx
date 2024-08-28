import Button from '@/components/common/Button';
import Layout from '@/components/Layout';
import { SiNaver } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import kakaoImage from '@/assets/images/kakao_login_large_wide.png';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { handleKakaoLogin } = useAuth();

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>로그인</Layout.Header>
      <Layout.Main>
        <div className="flex flex-col items-center h-full">
          <div className="w-full h-[52px]">
            <button className="w-full h-[52px]" onClick={handleKakaoLogin}>
              <img
                src={kakaoImage}
                alt="kakaoButton"
                className="w-full h-full object-contain "
              />
            </button>
            <Button
              type="button"
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
