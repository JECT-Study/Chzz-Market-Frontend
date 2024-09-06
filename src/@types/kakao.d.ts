export interface Kakao {
  init: (apiKey: string) => void;
  Auth: {
    authorize: (options: { redirectUri: string }) => void;
  };
}

export interface Window {
  Kakao?: Kakao;
  Naver?: Naver;
}
