import ProductListPage from '@/pages/ProductList';
import ROUTERS from '@/constants/route';
import { createBrowserRouter } from 'react-router-dom';
import Bid, { loader as bidLoader } from './pages/Bid';

import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/User';
import OrderHistory from './pages/OrderHistory';
import ProfileEdit from './pages/ProfileEdit';
import Register from './pages/Register';
import Signup from './pages/Signup';
import DetailPage from './pages/DetailPage';
import AddressBook from './pages/AddressBook';
import UserRegisteredList from './pages/UserRegisteredList';

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
    path: ROUTERS.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTERS.ORDER.HISTORY,
    element: <OrderHistory />,
  },
  {
    path: ROUTERS.USER,
    element: <User />,
  },
  {
    path: ROUTERS.REGISTERED.LIST,
    element: <UserRegisteredList />,
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
