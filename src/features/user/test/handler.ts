import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/shared';
import myAuctionData from './auctionData';
import { mockUserProfile } from './userProfileData';

export const getMyAuctionPreRegisterHandler: HttpHandler = http.get(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.MY_AUCTION_PRE_REGISTER}`,
  ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '0';
    const size = url.searchParams.get('size') || '5';
    const startIndex = Number(page) * Number(size);
    const endIndex = startIndex + Number(size);
    const paginatedContent = myAuctionData.content.slice(startIndex, endIndex);

    return new HttpResponse(
      JSON.stringify({
        ...myAuctionData,
        content: paginatedContent,
        pageable: {
          ...myAuctionData.pageable,
          pageNumber: Number(page),
          pageSize: Number(size)
        },
        last: page === (myAuctionData.totalPages - 1).toString(),
        numberOfElements: paginatedContent.length
      }),
      {
        status: 200,
        statusText: 'OK'
      }
    );
  }
);

export const getUserProfileHandler: HttpHandler = http.get(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.SIGNUP}`,
  async () => {
    return new HttpResponse(JSON.stringify(mockUserProfile), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
);

export const refreshTokenHandler: HttpHandler = http.post(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.REFRESH_TOKEN}`,
  async () => {
    const mockResponse = {
      status: 'success',
      data: {
        accessToken: 'mockKakaoAccessToken'
      }
    };

    return new HttpResponse(JSON.stringify(mockResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer mockAccessToken`
      }
    });
  }
);

export const logoutHandler: HttpHandler = http.post(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.LOGOUT}`,
  () => {
    return new HttpResponse(null, {
      status: 200,
      statusText: 'OK'
    });
  }
);

export const deleteUserHandler: HttpHandler = http.delete(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.SIGNUP}`,
  () => {
    return new HttpResponse(null, {
      status: 200,
      statusText: 'OK'
    });
  }
);

export const mockUserHandlers = [
  getMyAuctionPreRegisterHandler,
  getUserProfileHandler,
  logoutHandler,
  deleteUserHandler,
  refreshTokenHandler
];
