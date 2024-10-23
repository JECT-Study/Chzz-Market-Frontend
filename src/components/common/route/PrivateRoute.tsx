import { isLoggedIn } from '@/store/authSlice';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isLogin = useSelector(isLoggedIn);

  if (!isLogin) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default PrivateRoute;
