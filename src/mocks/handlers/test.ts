import { http, HttpHandler, HttpResponse } from 'msw';
import { API_END_POINT } from '@/constants/api';

export const test: HttpHandler = http.post(
  `${API_END_POINT.TEST}`,
  async () => {
    return new HttpResponse(
      JSON.stringify({ status: 'created', message: 'success' }),
    );
  },
);

export default test;
