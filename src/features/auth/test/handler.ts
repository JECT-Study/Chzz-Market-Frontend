import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { http, HttpHandler, HttpResponse } from 'msw';

const postSignupHandler: HttpHandler = http.post(`${API_END_POINT.SIGNUP}`, async () => {
  return new HttpResponse(
    JSON.stringify({
      status: 'created',
      message: 'success',
    }),
    {
      status: 201,
      headers: {
        Authorization: 'Bearer accessTokenaaaaaa',
      },
    }
  );
});

export default postSignupHandler;
