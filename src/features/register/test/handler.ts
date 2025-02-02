import { HttpHandler, HttpResponse, http } from 'msw';

import { API_END_POINT } from '@/shared';
import type { IAuctionImageUploadURLs } from '..';

export const postAuctionHandler: HttpHandler = http.post(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.AUCTION}`,
  () => {
    return new HttpResponse('Created', { status: 201 });
  }
);

export const getAuctionUploadURLsHandler: HttpHandler = http.post(
  `${import.meta.env.VITE_API_URL}${API_END_POINT.AUCTION_IMAGE_UPLOAD_URL}`,
  async ({ request }) => {
    const imageNames = (await request.json()) as string[];
    const mockResponse: IAuctionImageUploadURLs[] = imageNames.map(
      (name, idx) => ({
        objectKey: `${idx}_${name}`,
        uploadUrl: `https://fake-presigned-url/${name}`,
        expiration: String(idx)
      })
    );

    return HttpResponse.json(mockResponse);
  }
);

export const uploadImagesToS3Handler: HttpHandler = http.put(
  'https://fake-presigned-url/:filename',
  () => {
    return new HttpResponse('Success', { status: 200 });
  }
);
