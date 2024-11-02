import { store } from '@/app/store';
import { storeLogin, storeLogout } from '@/features/auth/model/authSlice';

export const getToken = () => {
  const state = store.getState();
  const { token } = state.auth;

  return token || localStorage.getItem('accessToken');
};

export const setToken = (token: string | null) => {
  store.dispatch(storeLogin({ token }));

  if (token) {
    localStorage.setItem('accessToken', token);
  } else {
    localStorage.removeItem('accessToken');
  }
};

export const removeToken = () => {
  store.dispatch(storeLogout());
  localStorage.removeItem('accessToken');
};
