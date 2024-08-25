import { RouterProvider } from 'react-router-dom';
import { router } from './routing';
import useKakaoInit from './hooks/useKakaoInit';

const App = () => {
  useKakaoInit();

  return <RouterProvider router={router} />;
};
export default App;
