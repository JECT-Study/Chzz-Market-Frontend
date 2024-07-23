import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing';

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
