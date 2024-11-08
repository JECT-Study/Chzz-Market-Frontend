import './index.css';

import { storeLogin } from '@/features/auth/model/authSlice';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import App from './App';
import { ReactQueryProvider } from './provider/index';
import { store } from './store';

export const serverAPI = (path: string) => `${import.meta.env.VITE_API_URL}${path}`;

// async function enableMocking(): Promise<void> {
//   if (import.meta.env.MODE !== 'development') {
//     return;
//   }

//   const { worker } = await import('./mocks/browser');
//   await worker.start({
//     onUnhandledRequest: (req) => {
//       const url = new URL(req.url);
//       if (url.pathname.endsWith('.svg')) {
//         return; // .svg 파일 요청을 무시
//       }
//     },
//   });
// }

// enableMocking().then(() => {
const token = localStorage.getItem('accessToken');
if (token) {
  store.dispatch(storeLogin({ token }));
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactQueryProvider>
    <Provider store={store}>
      <App />
    </Provider>
    <Toaster richColors position='top-right' />
  </ReactQueryProvider>
);
// });
