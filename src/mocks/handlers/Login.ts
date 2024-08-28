import { http, HttpHandler, HttpResponse } from 'msw';
import { API_END_POINT } from '@/constants/api';

const postSignup: HttpHandler = http.post(
  `${API_END_POINT.SIGNUP}`,
  async () => {
    return new HttpResponse(
      JSON.stringify({
        status: 'created',
        message: 'success',
      }),
    );
  },
);

export default postSignup;
