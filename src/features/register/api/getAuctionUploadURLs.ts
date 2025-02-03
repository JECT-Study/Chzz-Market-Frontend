import { API_END_POINT, httpClient } from '@/shared';

import type { IAuctionImageUploadURLs } from '..';

export const getAuctionUploadURLs = async (
  imageNames: string[]
): Promise<IAuctionImageUploadURLs[]> => {
  const response = await httpClient.post(
    `${API_END_POINT.AUCTION_IMAGE_UPLOAD_URL}`,
    imageNames
  );

  return response.data;
};
