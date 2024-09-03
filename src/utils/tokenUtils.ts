import { store } from '@/store';
import { storeLogin, storeLogout } from '@/store/authSlice';

export const getToken = () => {
  const state = store.getState();
  return state.auth.token;
};

export const updateReduxAuthState = (token: string) => {
  store.dispatch(storeLogin({ token }));
};

export const removeToken = () => {
  store.dispatch(storeLogout());
};

export const setToken = (token: string) => {
  store.dispatch(storeLogin({ token }));
};
