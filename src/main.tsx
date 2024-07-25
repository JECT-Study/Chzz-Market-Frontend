import './index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';
import ReactQueryProvider from './provider/queryProvider';

async function enableMocking(): Promise<void> {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/broswer');

  await worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <ReactQueryProvider showDevTools>
      <Provider store={store}>
        <App />
      </Provider>
    </ReactQueryProvider>,
  );
});
