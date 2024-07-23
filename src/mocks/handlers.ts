import { http, HttpResponse, HttpHandler } from 'msw';

export const handlers: HttpHandler[] = [
  // An example handler
  http.get('/user', () => {
    return HttpResponse.json({ name: 'John Maverick' });
  }),
];

export default handlers;
