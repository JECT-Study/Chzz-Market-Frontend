import { isLoggedIn } from '@/store/authSlice';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const isLogin = useSelector(isLoggedIn);
  const { search } = useLocation();

  if (isLogin) {
    if (search === '') toast.warning('이미 로그인된 사용자입니다.');
    return <Navigate to='/' replace />;
  }

  return children;
};

export default PublicRoute;
