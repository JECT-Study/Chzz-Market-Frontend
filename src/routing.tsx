import Home from '@/pages/Home';
import ProductList from '@/pages/ProductList';
import ROUTERS from '@/constants/route';
import { createBrowserRouter } from 'react-router-dom';
import Register from './pages/Register';

const routeList = [
  {
    path: ROUTERS.HOME,
    element: <Home />,
  },
  {
    path: ROUTERS.PRODUCT.LIST,
    element: <ProductList />,
  },
  {
    path: ROUTERS.REGISTER,
    element: <Register />,
  },
];

export const router = createBrowserRouter(
  routeList.map((item) => {
    return {
      ...item,
      // errorElement <Error> 만들기
    };
  }),
);

export default router;
