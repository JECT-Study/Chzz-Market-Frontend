import { http, HttpHandler, HttpResponse } from 'msw';
import { API_END_POINT } from '@/constants/api';
import ongoingProducts from '../data/ongoingData';

export const getTest: HttpHandler = http.get(
  `${API_END_POINT.TEST}`,
  async () => {
    return new HttpResponse(
      JSON.stringify({
        test: [...ongoingProducts],
      }),
      {
        status: 200,
        statusText: 'OK',
      },
    );
  },
);

export default getTest;
