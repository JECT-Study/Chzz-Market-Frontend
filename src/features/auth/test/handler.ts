import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/shared/constants/apiEndPoint';

export const kakaoLoginHandler: HttpHandler = http.post(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.LOGIN.KAKAO}`,
  async () => {
    const responseData = {
      status: 'success',
      data: {
        accessToken: 'kakaoAccessToken',
        refreshToken: 'kakaoRefreshToken',
        nickname: 'kakaoUser',
        bio: 'hi i am kakaoUser'
      }
    };

    document.cookie = `refreshToken=${responseData.data.refreshToken}; Path=/; HttpOnly`;
    localStorage.setItem('accessToken', responseData.data.accessToken);

    return new HttpResponse(JSON.stringify(responseData), {
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
          Authorization: 'Bearer accessTokenaaaaaa'
        }
      }
    );
  }
);
