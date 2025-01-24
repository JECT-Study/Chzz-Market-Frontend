import './index.css';

import App from './App';
import { Provider } from 'react-redux';
import { ReactQueryProvider } from './provider/index';
import { Toaster } from 'sonner';
import { createRoot } from 'react-dom/client';
import { store } from './store';
import { storeLogin } from '@/features/auth/model/authSlice';

async function setupMocks(): Promise<void> {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  if (import.meta.env.VITE_USE_MOCK !== 'true') return;

  const { worker } = await import('../shared/api/msw/browser');
  await worker.start({
    onUnhandledRequest: (req) => {
      const url = new URL(req.url);
      if (url.pathname.endsWith('.svg')) {
        return; // .svg 파일 요청을 무시
      }
    },
  });
}


(async () => {
  const token = localStorage.getItem('accessToken');
  if (token) store.dispatch(storeLogin({ token }))

  await setupMocks()

  const root = createRoot(document.getElementById('root')!)
  root.render(
    <ReactQueryProvider>
      <Provider store={store}>
        <App />
      </Provider>
      <Toaster richColors />
    </ReactQueryProvider>
  );
})()
