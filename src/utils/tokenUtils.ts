import { store } from '@/store';
import { storeLogin, storeLogout } from '@/store/authSlice';

export const getToken = () => {
  const state = store.getState();
  return state.auth.token;
};

export const setToken = (token: string | null) => {
  store.dispatch(storeLogin({ token }));
  localStorage.setItem('accessToken', token || '');
};

export const removeToken = () => {
  store.dispatch(storeLogout());
  localStorage.removeItem('accessToken');
};
