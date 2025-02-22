import { removeToken } from '@/shared';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { logout } from '..';

export const useAuth = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/kakao`;
  };

  const handleNaverLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/naver`;
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
