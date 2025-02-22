import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

import type { IAuctionImageUploadURLs } from '../config/type';

export const getAuctionUploadURLs = async (
  imageNames: string[]
): Promise<IAuctionImageUploadURLs[]> => {
  const response = await httpClient.post(
    `${API_END_POINT.AUCTION_IMAGE_UPLOAD_URL}`,
    imageNames
  );

  return response.data;
};
