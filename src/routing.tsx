import Home from '@/pages/home';
import ProductListPage from '@/pages/ProductListPage';
import ROUTERS from '@/constants/route';
import Test from '@/pages/Test';
import { createBrowserRouter } from 'react-router-dom';
import Register from './pages/Register';
import ProfileEditPage from './pages/ProfileEditPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import MyPage from './pages/MyPage';
import AllOrderList from './pages/AllOrderList';
import Signup from './pages/Signup';

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
  {
    path: ROUTERS.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTERS.ORDER.HISTORY,
    element: <OrderHistoryPage />,
  },
  {
    path: ROUTERS.MYPAGE,
    element: <MyPage />,
  },
  {
    path: ROUTERS.ORDER.AllLIST,
    element: <AllOrderList />,
  },
  {
    path: ROUTERS.SIGNUP,
    element: <Signup />,
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
