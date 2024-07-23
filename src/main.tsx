import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';
import ReactQueryProvider from './provider/queryProvider';

createRoot(document.getElementById('root')!).render(
  <ReactQueryProvider showDevTools>
    <Provider store={store}>
      <App />
    </Provider>
  </ReactQueryProvider>,
);
