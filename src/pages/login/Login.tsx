import { Layout } from '@/app/layout/ui/Layout';
import { useAuth } from '@/features/auth/hooks/useAuth';
import Logo from '@/shared/assets/icons/logo.svg';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { useNavigate } from 'react-router';
export const Login = () => {
  const navigate = useNavigate();
  const { handleKakaoLogin, handleNaverLogin } = useAuth();

  return (
    <Layout>
      <Layout.Header title="로그인" handleBack={() => navigate('/')} />
      <Layout.Main>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center w-full gap-1 h-1/2">
            <img src={Logo} aria-label='logo' className='size-28 web:w-[9rem] web:h-[8rem]' />
            <h2 className="pt-5 text-3xl font-semibold text-center web:text-4xl">
              치즈 마켓
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 w-full gap-4">
            <div className="flex justify-center w-[20.69rem] web:w-[30rem]">
              <button
                onClick={handleKakaoLogin}
                className="flex items-center w-full h-[3.13rem] web:h-[3.25rem] bg-[#FEEA1C] text-black text-lg rounded-lg cursor-pointer hover:bg-[#F4DC00] focus:ring-2 focus:ring-offset-2 focus:ring-[#F4DC00] focus:outline-none"
                aria-label="카카오 로그인"
              >
                <div className="flex items-center justify-center w-12 h-full pl-3 rounded-l-lg">
                  <RiKakaoTalkFill size={36} />
                </div>
                <span className="flex-grow mr-6">카카오 로그인</span>
              </button>
            </div>
            <div className="flex justify-center w-[20.69rem] web:w-[30rem]">
              <button
                onClick={handleNaverLogin}
                className="flex items-center w-full h-[3.13rem] web:h-[3.25rem] bg-[#1ec800] text-white text-lg rounded-lg cursor-pointer hover:bg-[#17b000] focus:ring-2 focus:ring-offset-2 focus:ring-[#17b000] focus:outline-none"
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
