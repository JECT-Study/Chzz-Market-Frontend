import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';

import type { IRegisterPost } from '../config/type';

export const postAuction = async (submitData: IRegisterPost) => {
  await httpClient.post(`${API_END_POINT.AUCTION}`, submitData);
};
