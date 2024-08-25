import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/utils/axios';

export const getMyAuctionPreRegister = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const response = await httpClient.get(
    `${API_END_POINT.MY_ACUTION_PRE_REGISTER}`,
    {
      params: {
        page,
        size,
      },
    },
  );
  const { content, totalElements } = response.data;
  const totalPages = Math.ceil(totalElements / size);
  const last = page >= totalPages;
  const hasNext = !last;

  return {
    content,
    pageNumber: page,
    pageSize: size,
    totalPages,
    totalElements,
    last,
    hasNext,
  };
};
