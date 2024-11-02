import { isLoggedIn } from '@/features/auth/model/authSlice';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const isLogin = useSelector(isLoggedIn);

  if (isLogin) {
    return <Navigate to='/' replace />;
  }

  return children;
};