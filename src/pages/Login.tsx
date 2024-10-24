import Layout from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import kakaoImage from '@/assets/images/kakao_login_large_wide.png';
import ChizzImage from '@/assets/icons/main_cheese_icon.svg';
import { SiNaver } from 'react-icons/si';
import { useAuth } from '@/hooks/useAuth';
import { useRefreshTokenOnSuccess } from '@/components/login/queries';

const Login = () => {
  const navigate = useNavigate();
  const { handleKakaoLogin, handleNaverLogin } = useAuth();
  const { isSuccess } = useRefreshTokenOnSuccess();
  if (isSuccess) {
    navigate('/');
  }

  return (
    <Layout>
      <Layout.Header title="로그인" handleBack={() => navigate('/')} />
      <Layout.Main>
        <div className="flex flex-col items-center h-full">
          <div className="w-full h-2/5 flex flex-col justify-center items-center lg:mt-10">
            <img 
              src={ChizzImage} 
              alt="logo" 
              className="w-32 h-32 sm:w-[76px] sm:h-[69px] lg:w-40 lg:h-40 2xl:w-48 2xl:h-48" />
            <h2 className="text-center pt-5 sm:text-2xl lg:text-4xl font-semibold">치즈 마켓</h2>
          </div>

          <div className="flex flex-col gap-4 items-center w-full mt-5 lg:mt-10">
            <div className="sm:w-[280px] lg:w-[320px] h-12 cursor-pointer rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:outline-none">
              <img
                src={kakaoImage}
                alt="kakaoButton"
                className="h-full object-cover opacity-90"
                onClick={handleKakaoLogin}
              />
            </div>
            <div className="flex justify-center sm:w-[280px] lg:w-[320px] h-12 ">
              <button
                onClick={handleNaverLogin}
                className="w-full h-12 bg-[#1ec800] text-white text-base sm:text-lg  rounded-lg flex items-center cursor-pointer hover:bg-[#17b000] focus:ring-2 focus:ring-offset-2 focus:ring-[#17b000] focus:outline-none"
                aria-label="네이버 로그인"
              >
                <div className="flex items-center justify-center w-12 h-full rounded-l-lg">
                  <SiNaver size={24} />
                </div>
                <span className="flex-grow mr-6">네이버 로그인</span>
              </button>
            </div>
          </div>
        </div>
      </Layout.Main>
    </Layout>
  );
};

export default Login;
