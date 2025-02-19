import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { removeToken } from '@/shared/utils/token';
import { logout } from '../api/logout';

export const useAuth = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = async () => {
    if (import.meta.env.VITE_USE_MOCK === 'true') {
      // Mocking 환경
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/oauth2/authorization/kakao`
      );

      const { data } = response;

      // Mocked 응답 처리
      localStorage.setItem('accessToken', data.data.accessToken);
      document.cookie = `REFRESH=${data.data.refreshToken}; Path=/;`;

      window.location.href = '/login?status=success';
    } else {
      window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/kakao`;
    }
  };

  const handleNaverLogin = async () => {
    if (import.meta.env.VITE_USE_MOCK === 'true') {
      // Mocking 환경
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/oauth2/authorization/kakao`
      );

      const { data } = response;

      // Mocked 응답 처리
      localStorage.setItem('accessToken', data.data.accessToken);
      document.cookie = `REFRESH=${data.data.refreshToken}; Path=/;`;

      window.location.href = '/login?status=success';
    } else {
      window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/naver`;
    }
  };

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      removeToken();
      navigate('/');
    }
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return { handleKakaoLogin, handleNaverLogin, handleLogout };
};
