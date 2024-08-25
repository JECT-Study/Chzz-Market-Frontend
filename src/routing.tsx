import ProductListPage from '@/pages/ProductList';
import ROUTERS from '@/constants/route';
import Test from '@/pages/Test';
import { createBrowserRouter } from 'react-router-dom';
import Bid, { loader as bidLoader } from './pages/Bid';

import Home from './pages/Home';
import Login from './pages/Login';
import MyOrderList from './pages/MyOrderList';
import MyPage from './pages/MyPage';
import OrderHistory from './pages/OrderHistory';
import ProfileEdit from './pages/ProfileEdit';
import Register from './pages/Register';
import Signup from './pages/Signup';
import DetailPage from './pages/DetailPage';

const routeList = [
  {
    path: ROUTERS.HOME,
    element: <Home />,
  },
  {
    path: `${ROUTERS.BID}/:auctionId`,
    element: <Bid />,
    loader: bidLoader,
  },
  {
    path: ROUTERS.PRODUCT.LIST,
    element: <ProductListPage />,
  },
  {
    path: ROUTERS.PROFILE.EDIT,
    element: <ProfileEdit />,
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
    element: <OrderHistory />,
  },
  {
    path: ROUTERS.MYPAGE,
    element: <MyPage />,
  },
  {
    path: ROUTERS.ORDER.MYORDERLIST,
    element: <MyOrderList />,
  },
  {
    path: ROUTERS.SIGNUP,
    element: <Signup />,
  },
  {
    path: ROUTERS.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTERS.DETAIL.ITEM,
    element: <DetailPage />,
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
