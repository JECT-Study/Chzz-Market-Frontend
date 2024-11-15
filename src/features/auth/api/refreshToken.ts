import { API_END_POINT, httpClient, setToken } from "@/shared";

export const refreshToken = async () => {
  try {
    const response = await httpClient.post(API_END_POINT.REFRESH_TOKEN);
    const newAccessToken = response.headers.authorization?.split(' ')[1];

    if (newAccessToken) {
      setToken(newAccessToken);
    }

    return newAccessToken;
  } catch (error) {
    throw error;
  }
};