import { API_END_POINT } from '@/constants/api';
// eslint-disable-next-line import/no-cycle
import { TestItems } from '@/pages/Test';
import { httpClient } from '@/utils/axios';

interface TestData {
  test: TestItems[];
}

export const getTest = async (): Promise<TestData> => {
  const response = await httpClient.get(API_END_POINT.TEST);
  return response.data;
};
