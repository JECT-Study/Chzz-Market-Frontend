import { AxiosError } from 'axios';
import { ERROR_CODE } from '../constants/index';

export const getErrorByCode = (
  error: AxiosError<{ status: number; name: string; message: string[] }>
) => {
  const serverErrorCode = error?.response?.data ?? '';
  const httpErrorCode = error?.response?.status ?? '';
  const axiosErrorCode = error?.code ?? '';

  if (serverErrorCode && serverErrorCode.status in ERROR_CODE) {
    const englishPattern = /^[A-Za-z\s]+$/;

    return englishPattern.test(serverErrorCode.message[0])
      ? ERROR_CODE[serverErrorCode.status]
      : {
          ...ERROR_CODE[serverErrorCode.status],
          description: serverErrorCode.message[0]
        };
  }
  if (httpErrorCode in ERROR_CODE) {
    return ERROR_CODE[httpErrorCode];
  }
  if (axiosErrorCode in ERROR_CODE) {
    return ERROR_CODE[axiosErrorCode];
  }
  return ERROR_CODE.default;
};
