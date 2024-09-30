import { isLoggedIn } from '@/store/authSlice';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isLogin = useSelector(isLoggedIn);

  if (!isLogin) {
    toast.warning('로그인이 필요한 서비스입니다.');
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default PrivateRoute;
