import Button from '@/components/common/Button';
import Layout from '@/components/Layout';
import { SiNaver } from 'react-icons/si';
import { Window } from '@/@types/kakao';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    if ((window as Window).Kakao) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).Kakao.Auth.authorize({
        redirectUri: 'http://localhost:5173/login/kakao/code',
      });
    }
  };

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>로그인</Layout.Header>
      <Layout.Main>
        <div className="flex flex-col items-center h-full">
          {/* <img /> */}
          <div className="w-full h-[52px]">
            <button className="w-full h-[52px]" onClick={handleKakaoLogin}>
              <img
                src="/kakao_login_large_wide.png"
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
