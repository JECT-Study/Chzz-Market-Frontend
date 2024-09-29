import Layout from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import kakaoImage from '@/assets/images/kakao_login_large_wide.png';
import ChizzImage from '@/assets/icons/main_cheese_icon.svg';
import { SiNaver } from 'react-icons/si';
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
                className="w-full h-full object-cover cursor-pointer rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-[#c8b612] focus:outline-none"
                onClick={handleKakaoLogin}
              />
            </div>
            <div className="w-[320px] h-12 ">
              <button
                onClick={handleNaverLogin}
                className="w-full h-12 bg-[#1ec800] text-white text-lg rounded-lg flex items-center cursor-pointer hover:bg-[#17b000] focus:ring-2 focus:ring-offset-2 focus:ring-[#17b000] focus:outline-none"
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
