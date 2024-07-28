import { createBrowserRouter } from 'react-router-dom';
import ROUTERS from '@/constants/route';
import Home from '@/pages/Home';
import ProductListPage from '@/pages/ProductListPage';
import Test from '@/pages/Test';
import ProfileEditPage from './pages/ProfileEditPage';

const routeList = [
  {
    path: ROUTERS.HOME,
    element: <Home />,
  },
  {
    path: ROUTERS.PRODUCT.LIST,
    element: <ProductListPage />,
  },
  {
    path: ROUTERS.PROFILE.EDIT,
    element: <ProfileEditPage />,
  },
  {
    path: '/test',
    element: <Test />,
  },
];

export const router = createBrowserRouter(
  routeList.map((item) => {
    return {
      ...item,
      element: <div>{item.element}</div>,
      // errorElement <Error> 만들기
    };
  }),
);

export default router;
