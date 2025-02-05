import './index.css';

import { storeLogin } from '@/features/auth/model/authSlice';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import App from './App';
import { ReactQueryProvider } from './provider/index';
import { store } from './store';

async function setupMocks(): Promise<void> {
  const forceMock = import.meta.env.VITE_USE_MOCK_FORCE === 'true';

  if (!forceMock && import.meta.env.MODE !== 'development') {
    return;
  }

  if (!forceMock && import.meta.env.VITE_USE_MOCK !== 'true') {
    return;
  }

  const { worker } = await import('../shared/api/msw/browser');
  await worker.start({
    onUnhandledRequest: (req) => {
      const url = new URL(req.url);
      if (url.pathname.endsWith('.svg')) {
        // .svg 파일 요청을 무시
      }
    }
  });
}

(async () => {
  const token = localStorage.getItem('accessToken');
  if (token) store.dispatch(storeLogin({ token }));

  await setupMocks();

  const root = createRoot(document.getElementById('root')!);
  root.render(
    <ReactQueryProvider>
      <Provider store={store}>
        <App />
      </Provider>
      <Toaster richColors />
    </ReactQueryProvider>
  );
})();
