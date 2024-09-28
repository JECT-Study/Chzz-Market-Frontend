import { useLocation, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '@/store/authSlice';

interface LoginProviderProps {
  children: React.ReactNode;
}

const LoginProvider = ({ children }: LoginProviderProps) => {
  const navigate = useNavigate();
  const isLogin = useSelector(isLoggedIn);
  const location = useLocation();

  useEffect(() => {
    if (!isLogin && location.pathname !== '/signup') {
      navigate('/login');
    }
  }, [isLogin, navigate, location.pathname]);

  return children as JSX.Element;
};

export default LoginProvider;
