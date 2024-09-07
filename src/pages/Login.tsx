import Layout from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import kakaoImage from '@/assets/images/kakao_login_large_wide.png';
import naverImage from '@/assets/images/naver_login.png';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { handleKakaoLogin, handleNaverLogin } = useAuth();

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>로그인</Layout.Header>
      <Layout.Main>
        <div className="flex flex-col items-center h-full">
          <div className="h-2/5">
            <img
              src="https://via.placeholder.com/300"
              alt="logo"
              className="w-52 h-52"
            />
          </div>

          <div className="flex flex-col items-center w-full gap-4">
            <div className="w-100 h-[52px]">
              <img
                src={kakaoImage}
                alt="kakaoButton"
                className="object-contain w-full h-full cursor-pointer"
                onClick={handleKakaoLogin}
              />
            </div>
            <div className="w-100 h-[52px]">
              <img
                src={naverImage}
                alt="naverButton"
                className="object-contain w-full h-full cursor-pointer"
                onClick={handleNaverLogin}
              />
            </div>
          </div>
        </div>
      </Layout.Main>
    </Layout>
  );
};

export default Login;
