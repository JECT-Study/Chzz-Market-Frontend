import { API_END_POINT, httpClient } from '@/shared';

import type { IRegisterPost } from '..';

export const postAuction = async (submitData: IRegisterPost) => {
  await httpClient.post(`${API_END_POINT.AUCTION}`, submitData);
};
