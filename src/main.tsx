import './index.css';

import { store } from '@/store';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import App from './App';
import ReactQueryProvider from './provider/queryProvider';
import { storeLogin } from './store/authSlice';

// async function enableMocking(): Promise<void> {
//   // if (import.meta.env.MODE !== 'development') {
//   //   return;
//   // }
//   // const { worker } = await import('./mocks/browser');
//   // await worker.start();
// }

// enableMocking().then(() => {
const token = localStorage.getItem('accessToken');
if (token) {
  store.dispatch(storeLogin({ token }));
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactQueryProvider showDevTools>
    <Provider store={store}>
      <App />
      <Toaster richColors position='top-right' />
    </Provider>
  </ReactQueryProvider>
);
// });
