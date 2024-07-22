import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages/home';
import Layout from './components/Layout';

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
