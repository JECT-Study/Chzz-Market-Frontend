import './index.css';

import { storeLogin } from '@/features/auth/model/authSlice';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import App from './App';
import { ReactQueryProvider } from './provider/index';
import { store } from './store';

export const serverAPI = (path: string) => `${import.meta.env.VITE_API_URL}${path}`;

(async () => {
  const token = localStorage.getItem('accessToken');
  if (token) store.dispatch(storeLogin({ token }))

  await import('../shared/test/setupMocks').then((module) => module.setupMocks())

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <ReactQueryProvider>
      <Provider store={store}>
        <App />
      </Provider>
      <Toaster richColors />
    </ReactQueryProvider>
  );
})()
