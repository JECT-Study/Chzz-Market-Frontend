import ProductListPage from '@/pages/ProductList';
import ROUTERS from '@/constants/route';
import { createBrowserRouter } from 'react-router-dom';
import Bid, { loader as bidLoader } from './pages/Bid';
import BidderList, { loader as bidderListLoader } from './pages/BidderList';

import AddressBook from './pages/AddressBook';
import AsyncBoundary from './components/common/AsyncBoundary';
import DetailPage from './pages/DetailPage';
import GlobalLayout from './components/layout/GlobalLayout';
import Heart from './pages/Heart';
import Home from './pages/Home';
import LayoutWithNav from './components/layout/LayoutWithNav';
import Login from './pages/Login';
import NotFound from './components/common/NotFound';
import Notification from './pages/Notification';
import OrderHistory from './pages/OrderHistory';
import ProfileEdit from './pages/ProfileEdit';
import Register from './pages/Register';
import Signup from './pages/Signup';
import User from './pages/User';
import UserRegisteredList from './pages/UserRegisteredList';

const layoutWithNavRoute = [
  {
    path: ROUTERS.HOME,
    element: <Home />,
  },
  {
    path: ROUTERS.NOTIFICATION,
    element: <Notification />,
  },
  {
    path: ROUTERS.HEART,
    element: <Heart />,
  },
  {
    path: ROUTERS.USER,
    element: <User />,
  },
];

export const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    errorElement: <NotFound />,
    children: [
      {
        element: (
          <AsyncBoundary>
            <LayoutWithNav />
          </AsyncBoundary>
        ),
        children: layoutWithNavRoute.map(({ path, element }) => ({
          path,
          element: <AsyncBoundary>{element}</AsyncBoundary>,
        })),
      },
      {
        path: `${ROUTERS.BID}`,
        element: <Bid />,
        loader: bidLoader,
      },
      {
        path: `${ROUTERS.FINAL_BIDDER_LIST}`,
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
        path: ROUTERS.REGISTER,
        element: <Register />,
      },
      {
        path: ROUTERS.ORDER.HISTORY,
        element: <OrderHistory />,
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
        path: `${ROUTERS.AUCTION.ITEM}/:productId`,
        element: <DetailPage />,
      },
      {
        path: ROUTERS.PRE_AUCTION.ITEM,
        element: <DetailPage />,
      },
      {
        path: ROUTERS.ADDRESSBOOK,
        element: <AddressBook />,
      },
    ],
  },
]);

export default router;
