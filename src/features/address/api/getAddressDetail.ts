import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

export const getAddressDetail = async (auctionId: string) => {
  const response = await httpClient.get(
    `${API_END_POINT.AUCTION}/${auctionId}/won`
  );
  return response.data;
};
