import ProductListPage from '@/pages/ProductList';
import ROUTERS from '@/constants/route';
import Test from '@/pages/Test';
import { createBrowserRouter } from 'react-router-dom';
import AllOrderList from './pages/AllOrderList';
import Home from './pages/Home';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProfileEditPage from './pages/ProfileEdit';
import Register from './pages/Register';
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
  {
    path: ROUTERS.LOGIN,
    element: <Login />,
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
