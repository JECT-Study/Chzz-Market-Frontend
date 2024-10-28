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
        <div className="flex flex-col items-center h-[37.5rem] lg:h-[75rem]">
          <div className="w-full h-[21rem] lg:h-[42rem] flex flex-col justify-center items-center">
            <img 
              src={ChizzImage} 
              alt="logo" 
              className="w-[4.75rem] h-[4.3125rem] lg:w-[9.5rem] lg:h-[8.625rem]" />
            <h2 className="text-center pt-5 text-2xl lg:text-4xl font-semibold">치즈 마켓</h2>
          </div>

          <div className="flex flex-col gap-4 items-center w-full mt-[9.375rem]">
            <div className="flex justify-center w-[20.6875rem] lg:w-[30rem]">
              <button
                onClick={handleKakaoLogin}
                className="flex items-center w-full h-[3.125rem] lg:h-[3.25rem] bg-[#FEEA1C] text-black text-lg rounded-lg cursor-pointer hover:bg-[#F4DC00] focus:ring-2 focus:ring-offset-2 focus:ring-[#F4DC00] focus:outline-none"
                aria-label="네이버 로그인"
              >
                <div className="flex items-center justify-center w-12 h-full pl-3 rounded-l-lg">
                  <RiKakaoTalkFill size={36} />
                </div>
                <span className="flex-grow mr-6">카카오 로그인</span>
              </button>
            </div>
            <div className="flex justify-center w-[20.6875rem] lg:w-[30rem]">
              <button
                onClick={handleNaverLogin}
                className="flex items-center w-full h-[3.125rem] lg:h-[3.25rem] bg-[#1ec800] text-white text-lg rounded-lg cursor-pointer hover:bg-[#17b000] focus:ring-2 focus:ring-offset-2 focus:ring-[#17b000] focus:outline-none"
                aria-label="네이버 로그인"
              >
                <div className="flex items-center justify-center w-12 h-full pl-3 rounded-l-lg">
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
