import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useEffect } from 'react';
import { refreshToken } from './components/login/queries';

const App = () => {
  useEffect(() => {
    refreshToken();
  }, []);
  return <RouterProvider router={router} />;
};
export default App;
