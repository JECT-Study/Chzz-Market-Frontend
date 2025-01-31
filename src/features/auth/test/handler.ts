import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT, setToken } from '@/shared';

export const kakaoLoginHandler: HttpHandler = http.get(`${import.meta.env.VITE_API_URL}/oauth2/authorization/kakao`, async () => {
  const mockResponse = {
    status: 'success',
    data: {
      accessToken: 'mockKakaoAccessToken',
      refreshToken: 'eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiUkVGUkVTSCIsImlkIjo5LCJyb2xlIjoiVVNFUiIsImlhdCI6MTczNzk2OTY2NywiZXhwIjoxNzM4MDU2MDY3fQ.wNobuJB2VOf_P6i7CyZc1N6OM',
      nickname: 'mockKakaoUser',
      bio: 'Hi, I am a mocked Kakao user.',
    },
  };

  document.cookie = `REFRESH=${mockResponse.data.refreshToken}; Path=/;`;

  setToken(mockResponse.data.accessToken);

  return new HttpResponse(JSON.stringify(mockResponse), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

export const naverLoginHandler: HttpHandler = http.get(`${import.meta.env.VITE_API_URL}/oauth2/authorization/naver`, async () => {
  const mockResponse = {
    status: 'success',
    data: {
      accessToken: 'mockKakaoAccessToken',
      refreshToken: 'eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiUkVGUkVTSCIsImlkIjo5LCJyb2xlIjoiVVNFUiIsImlhdCI6MTczNzk2OTY2NywiZXhwIjoxNzM4MDU2MDY3fQ.wNobuJB2VOf_P6i7CyZc1N6OM',
      nickname: 'mockNaverUser',
      bio: 'Hi, I am a mocked Naver user.',
    },
  };

  document.cookie = `REFRESH=${mockResponse.data.refreshToken}; Path=/;`;

  localStorage.setItem('accessToken', mockResponse.data.accessToken);

  setToken(mockResponse.data.accessToken);

  return new HttpResponse(JSON.stringify(mockResponse), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

export const postSignupHandler: HttpHandler = http.post(`${API_END_POINT.SIGNUP}`, async () => {
  return new HttpResponse(
    JSON.stringify({
      status: 'created',
      message: 'success',
    }),
    {
      status: 201,
      headers: {
        Authorization: 'Bearer accessToken',
      },
    }
  );
});