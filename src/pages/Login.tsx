import Layout from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import ChizzImage from '@/assets/icons/main_cheese_icon.svg';
import { RiKakaoTalkFill } from "react-icons/ri";
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
          <div className="w-full h-2/5 flex flex-col justify-center items-center">
            <img 
              src={ChizzImage} 
              alt="logo" 
              className="w-32 h-32 sm:w-[76px] sm:h-[69px] lg:w-40 lg:h-40 2xl:w-48 2xl:h-48" />
            <h2 className="text-center pt-5 sm:text-2xl lg:text-4xl font-semibold">치즈 마켓</h2>
          </div>

          <div className="flex flex-col gap-4 items-center w-full">
            <div className="flex justify-center sm:w-[280px] lg:w-[450px] h-12 sm:mt-[9.375rem] lg:mt-[12.5rem]">
              <button
                onClick={handleKakaoLogin}
                className="w-full h-12 bg-[#FEEA1C] text-black text-base sm:text-lg  rounded-lg flex items-center cursor-pointer hover:bg-[#F4DC00] focus:ring-2 focus:ring-offset-2 focus:ring-[#F4DC00] focus:outline-none"
                aria-label="네이버 로그인"
              >
                <div className="flex items-center justify-center w-12 h-full rounded-l-lg">
                  <RiKakaoTalkFill size={36} />
                </div>
                <span className="flex-grow mr-6">카카오 로그인</span>
              </button>
            </div>
            <div className="flex justify-center sm:w-[280px] lg:w-[450px] h-12 ">
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
