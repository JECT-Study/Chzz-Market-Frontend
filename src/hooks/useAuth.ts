import { Window } from '@/@types/kakao';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const handleKakaoLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
  };

  const handleNaverLogin = () => {
    if ((window as Window).Naver) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).Naver.Auth.authorize({
        redirectUri: 'http://localhost:5173/signup',
      });
    }
  };

  // const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  // const REDIRECT_URL = process.env.REACT_APP_KAKAO_REDIRECT_URL;
  // const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

  // const loginHanlder = () => {
  //   window.location.href = link;
  // };

  return { handleKakaoLogin, handleNaverLogin };
};
