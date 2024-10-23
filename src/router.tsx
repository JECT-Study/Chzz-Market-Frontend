import AuctionDetails, { loader as auctionDetailsLoader } from './pages/AuctionDetails';
import Bid, { loader as bidLoader } from './pages/Bid';
import BidderList, { loader as bidderListLoader } from './pages/BidderList';
import PreAuctionDetails, { loader as preAuctionDetailsLoader } from './pages/PreAuctionDetails';
import Register, { loader as registerLoader } from './pages/Register';

import APIAsyncBoundary from './components/common/boundary/APIAsyncBoundary';
import AuctionPayment from './pages/AuctionPayment';
import DeliveryAddressAdd from './pages/DeliveryAddressAdd';
import DeliveryAddressList from './pages/DeliveryAddressList';
import GlobalAsyncBoundary from './components/common/boundary/GlobalAsyncBoundary';
import GlobalLayout from './components/layout/GlobalLayout';
import Heart from './pages/Heart';
import Home from './pages/Home';
import LayoutWithNav from './components/layout/LayoutWithNav';
import Login from './pages/Login';
import Notification from './pages/Notification';
import OrderHistory from './pages/UserParticipatedList';
import PaymentSuccess from './pages/PaymentSuccess';
import PrivateRoute from './components/common/route/PrivateRoute';
import ProductList from '@/pages/ProductList';
import ProfileEdit from './pages/ProfileEdit';
import PublicRoute from './components/common/route/PublicRoute';
import ROUTES from '@/constants/routes';
import RouteErrorBoundary from './components/common/boundary/RouteErrorBoundary';
import Signup from './pages/Signup';
import Test from './pages/Test';
import User from './pages/User';
import UserRegisteredList from './pages/UserRegisteredList';
import { createBrowserRouter } from 'react-router-dom';

const layoutWithNavRouteList = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.NOTIFICATION,
    element: <Notification />,
  },
  {
    path: ROUTES.HEART,
    element: <Heart />,
  },
  {
    path: ROUTES.USER,
    element: <User />,
  },
  {
    path: ROUTES.REGISTERED_LIST,
    element: <UserRegisteredList />,
  },
  {
    path: ROUTES.PARTICIPATED_LIST,
    element: <OrderHistory />,
  },
];

const privateRouteList = [
  {
    path: ROUTES.BID,
    element: <Bid />,
    loader: bidLoader,
  },
  {
    path: ROUTES.FINAL_BIDDER_LIST,
    element: <BidderList />,
    loader: bidderListLoader,
  },
  {
    path: ROUTES.PROFILE_EDIT,
    element: <ProfileEdit />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: `${ROUTES.PRE_AUCTION_EDIT}/:preAuctionId`,
    element: <Register />,
    loader: registerLoader,
  },
  {
    path: ROUTES.AUCTION_SHIPPING,
    element: <AuctionPayment />,
  },
  {
    path: ROUTES.PAYMENT_SUCCESS,
    element: <PaymentSuccess />
  },
  {
    path: ROUTES.DELIVERY_ADDRESS_LIST,
    element: <DeliveryAddressList />
  },
  {
    path: ROUTES.DELIVERY_ADDRESS_ADD,
    element: <DeliveryAddressAdd />
  }
];

const publicRouteList = [
  {
    path: ROUTES.SIGNUP,
    element: <Signup />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
];

export const router = createBrowserRouter([
  {
    // Global Boundary
    element: <GlobalAsyncBoundary>
      <GlobalLayout />
    </GlobalAsyncBoundary>,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        // LayoutWithNav Boundary
        element: (
          <LayoutWithNav />
        ),
        children: layoutWithNavRouteList.map(({ path, element }) => ({
          path,
          element: (
            <APIAsyncBoundary>
              {path === '/' ? element : <PrivateRoute>{element}</PrivateRoute>}
            </APIAsyncBoundary>
          ),
        })),
      },

      ...privateRouteList.map(({ path, element, loader }) => ({
        path,
        element: (
          <PrivateRoute>{element}</PrivateRoute>
        ),
        ...(loader && { loader }),
      })),

      ...publicRouteList.map(({ path, element }) => ({
        path,
        element: <PublicRoute>{element}</PublicRoute>,
      })),

      {
        path: ROUTES.PRODUCT_LIST,
        element: (
          <ProductList />
        ),
      },
      {
        path: `${ROUTES.AUCTION_ITEM}/:auctionId`,
        element: (
          <AuctionDetails />
        ),
        loader: auctionDetailsLoader,
      },
      {
        path: `${ROUTES.PRE_AUCTION_ITEM}/:preAuctionId`,
        element: (
          <PreAuctionDetails />
        ),
        loader: preAuctionDetailsLoader,
      },
      {
        path: `/test`,
        element: <Test />
      },
    ],
  },
]);

export default router;
