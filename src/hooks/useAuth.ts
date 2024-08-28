import { Window } from '@/@types/kakao';

export const useAuth = () => {
  const handleKakaoLogin = () => {
    if ((window as Window).Kakao) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).Kakao.Auth.authorize({
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

  return { handleKakaoLogin };
};
