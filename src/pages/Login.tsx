import Layout from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import kakaoImage from '@/assets/images/kakao_login_large_wide.png';
import naverImage from '@/assets/images/naver_login.png';
import ChizzImage from '@/assets/icons/main_cheese_icon.svg';
import { useAuth } from '@/hooks/useAuth';
import { useRefreshTokenOnSuccess } from '@/components/home/queries';

const Login = () => {
  const navigate = useNavigate();
  const { handleKakaoLogin, handleNaverLogin } = useAuth();
  useRefreshTokenOnSuccess();

  return (
    <Layout>
      <Layout.Header title="로그인" handleBack={() => navigate('/')} />
      <Layout.Main>
        <div className="flex flex-col items-center h-full">
          <div className="w-full h-2/5 flex flex-col justify-center items-center mt-10">
            <img src={ChizzImage} alt="logo" className="w-52 h-52" />
            <h2 className="text-center pt-5 text-5xl font-bold">치즈 마켓</h2>
          </div>

          <div className="flex flex-col gap-4 items-center w-full mt-20">
            <div className="w-[320px] h-12">
              <img
                src={kakaoImage}
                alt="kakaoButton"
                className="w-full h-full object-cover cursor-pointer rounded-lg"
                onClick={handleKakaoLogin}
              />
            </div>
            <div className="w-[320px] h-12 ">
              <img
                src={naverImage}
                alt="naverButton"
                className="w-full h-full object-cover cursor-pointer rounded-lg"
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
