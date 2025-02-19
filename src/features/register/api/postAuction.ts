import { API_END_POINT } from '@/shared';
import { httpClient } from '@/shared/api/axios';

import type { IRegisterPost } from '..';

export const postAuction = async (submitData: IRegisterPost) => {
  await httpClient.post(`${API_END_POINT.AUCTION}`, submitData);
};
