import Bid, { loader as bidLoader } from './pages/Bid';
import BidderList, { loader as bidderListLoader } from './pages/BidderList';

import AddressBook from './pages/AddressBook';
import AsyncBoundary from './components/common/loadingAndError/AsyncBoundary';
import AuctionDetails from './pages/AuctionDetails';
import GlobalLayout from './components/layout/GlobalLayout';
import Heart from './pages/Heart';
import Home from './pages/Home';
import LayoutWithNav from './components/layout/LayoutWithNav';
import Login from './pages/Login';
import NotFound from './components/common/loadingAndError/NotFound';
import Notification from './pages/Notification';
import OrderHistory from './pages/UserParticipatedList';
import PreAuction from './pages/PreAuction';
import PrivateRoute from './components/common/route/PrivateRoute';
import ProductList from '@/pages/ProductList';
import ProfileEdit from './pages/ProfileEdit';
import PublicRoute from './components/common/route/PublicRoute';
import ROUTERS from '@/constants/route';
import Register, { loader as registerLoader } from './pages/Register';
import Signup from './pages/Signup';
import User from './pages/User';
import UserRegisteredList from './pages/UserRegisteredList';
import { createBrowserRouter } from 'react-router-dom';

const layoutWithNavRouteList = [
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
  {
    path: ROUTERS.REGISTERED_LIST,
    element: <UserRegisteredList />,
  },
  {
    path: ROUTERS.PARTICIPATED_LIST,
    element: <OrderHistory />,
  },
];

const privateRouteList = [
  {
    path: ROUTERS.BID,
    element: (
      <AsyncBoundary>
        <Bid />
      </AsyncBoundary>
    ),
    loader: bidLoader,
  },
  {
    path: ROUTERS.FINAL_BIDDER_LIST,
    element: <BidderList />,
    loader: bidderListLoader,
  },
  {
    path: ROUTERS.PROFILE_EDIT,
    element: <ProfileEdit />,
  },
  {
    path: ROUTERS.REGISTER,
    element: <Register />,
  },
  {
    path: `${ROUTERS.PRE_AUCTION.EDIT}/:preAuctionId`,
    element: <Register />,
    loader: registerLoader,
  },
  {
    path: ROUTERS.ADDRESSBOOK,
    element: <AddressBook />,
  },
];

const publicRouteList = [
  {
    path: ROUTERS.SIGNUP,
    element: <Signup />,
  },
  {
    path: ROUTERS.LOGIN,
    element: <Login />,
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
        children: layoutWithNavRouteList.map(({ path, element }) => ({
          path,
          element: <AsyncBoundary>{path === '/' ? element : <PrivateRoute>{element}</PrivateRoute>}</AsyncBoundary>,
        })),
      },
      ...privateRouteList.map(({ path, element, loader }) => ({
        path,
        element: <PrivateRoute>{element}</PrivateRoute>,
        ...(loader && { loader }),
      })),
      ...publicRouteList.map(({ path, element }) => ({
        path,
        element: <PublicRoute>{element}</PublicRoute>,
      })),
      {
        path: ROUTERS.PRODUCT_LIST,
        element: <ProductList />,
      },
      {
        path: `${ROUTERS.AUCTION.ITEM}/:productId`,
        element: (
          <AsyncBoundary>
            <AuctionDetails />
          </AsyncBoundary>
        ),
      },
      {
        path: `${ROUTERS.PRE_AUCTION.ITEM}/:productId`,
        element: <PreAuction />,
      },
    ],
  },
]);

export default router;
