import { logout } from '@/components/login/queries';
import { removeToken } from '@/utils/tokenUtils';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    window.location.href = 'https://chzz.store/oauth2/authorization/kakao';
  };

  const handleNaverLogin = () => {
    window.location.href = 'https://chzz.store/oauth2/authorization/naver';
  };

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      removeToken();
      navigate('/');
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return { handleKakaoLogin, handleNaverLogin, handleLogout };
};
