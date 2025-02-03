import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/shared';

export const kakaoLoginHandler: HttpHandler = http.get(
  `${import.meta.env.VITE_API_URL}/oauth2/authorization/kakao`,
  async () => {
    const mockResponse = {
      status: 'success',
      data: {
        accessToken: 'mockKakaoAccessToken',
        refreshToken: 'mockKakaoRefreshToken',
        nickname: 'mockKakaoUser',
        bio: 'Hi, I am a mocked Kakao user.'
      }
    };

    document.cookie = `REFRESH=${mockResponse.data.refreshToken}; Path=/;`;
    localStorage.setItem('accessToken', mockResponse.data.accessToken);

    return new HttpResponse(JSON.stringify(mockResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
);

export const naverLoginHandler: HttpHandler = http.get(
  `${import.meta.env.VITE_API_URL}/oauth2/authorization/naver`,
  async () => {
    const mockResponse = {
      status: 'success',
      data: {
        accessToken: 'mockNaverAccessToken',
        refreshToken: 'mockNaverRefreshToken',
        nickname: 'mockNaverUser',
        bio: 'Hi, I am a mocked Naver user.'
      }
    };

    document.cookie = `REFRESH=${mockResponse.data.refreshToken}; Path=/;`;
    localStorage.setItem('accessToken', mockResponse.data.accessToken);

    return new HttpResponse(JSON.stringify(mockResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
);

export const postSignupHandler: HttpHandler = http.post(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.SIGNUP}`,
  async () => {
    return new HttpResponse(
      JSON.stringify({
        status: 'created',
        message: 'success'
      }),
      {
        status: 201,
        headers: {
          Authorization: 'Bearer accessToken'
        }
      }
    );
  }
);
