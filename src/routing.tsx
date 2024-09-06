import ProductListPage from '@/pages/ProductList';
import ROUTERS from '@/constants/route';
import { createBrowserRouter } from 'react-router-dom';
import Bid, { loader as bidLoader } from './pages/Bid';

import DetailPage from './pages/DetailPage';
import Home from './pages/Home';
import Login from './pages/Login';
import MyOrderList from './pages/MyOrderList';
import MyPage from './pages/MyPage';
import Notification from './pages/Notification';
import OrderHistory from './pages/OrderHistory';
import ProfileEdit from './pages/ProfileEdit';
import Register from './pages/Register';
import Signup from './pages/Signup';
import BidderList, { loader as bidderListLoader } from './pages/BidderList';
import GlobalLayout from './components/layout/GlobalLayout';
import AddressBook from './pages/AddressBook';

const routeList = [
  {
    element: <GlobalLayout />,
    children: [
      {
        path: ROUTERS.HOME,
        element: <Home />,
      },
      {
        path: ROUTERS.NOTIFICATION,
        element: <Notification />,
      },
      {
        path: `${ROUTERS.BID}/:auctionId`,
        element: <Bid />,
        loader: bidLoader,
      },
      {
        path: `${ROUTERS.BIDDER_LIST}/:auctionId`,
        element: <BidderList />,
        loader: bidderListLoader,
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
      {
        path: ROUTERS.ADDRESSBOOK,
        element: <AddressBook />,
      },
    ],
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
