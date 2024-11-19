import { GlobalLayout, LayoutWithNav } from "@/app/layout";
import { APIAsyncBoundary, GlobalAsyncBoundary, PrivateRoute, PublicRoute, ROUTES, RouteErrorBoundary } from '@/shared';
import { AuctionDetails, Bid, Heart, Home, Login, Notification, Payment, PaymentAddressAdd, PaymentAddressEdit, PaymentAddressEditList, PaymentAddressList, PaymentSuccess, PreAuctionDetails, ProductList, Register, Settlement, Signup, Test, User, UserParticipatedList, UserPreRegisteredList, UserProfileEdit, UserRegisteredList, auctionDetailsLoader, bidLoader, preAuctionDetailsLoader, registerLoader, settlementLoader } from '../pages';

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
    path: ROUTES.USER.HOME,
    element: <User />,
  },
  {
    path: ROUTES.USER.REGISTERED_LIST,
    element: <UserRegisteredList />,
  },
  {
    path: ROUTES.USER.PRE_REGISTERED_LIST,
    element: <UserPreRegisteredList />,
  },
  {
    path: ROUTES.USER.PARTICIPATED_LIST,
    element: <UserParticipatedList />,
  },
];

const privateRouteList = [
  {
    path: ROUTES.BID,
    element: <Bid />,
    loader: bidLoader,
  },
  {
    path: ROUTES.SETTLEMENT,
    element: <Settlement />,
    loader: settlementLoader,
  },
  {
    path: ROUTES.USER.PROFILE_EDIT,
    element: <UserProfileEdit />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTES.PRE_AUCTION.EDIT,
    element: <Register />,
    loader: registerLoader,
  },
  {
    path: ROUTES.PAYMENT.HOME,
    element: <Payment />,
  },
  {
    path: ROUTES.PAYMENT.SUCCESS,
    element: <PaymentSuccess />
  },
  {
    path: ROUTES.PAYMENT.ADDRESS.LIST,
    element: <PaymentAddressList />
  },
  {
    path: ROUTES.PAYMENT.ADDRESS.ADD,
    element: <PaymentAddressAdd />
  },
  {
    path: ROUTES.PAYMENT.ADDRESS.EDIT,
    element: <PaymentAddressEdit />
  },
  {
    path: ROUTES.PAYMENT.ADDRESS.EDIT_LIST,
    element: <PaymentAddressEditList />
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
        path: ROUTES.AUCTION.ITEM,
        element: (
          <AuctionDetails />
        ),
        loader: auctionDetailsLoader,
      },
      {
        path: ROUTES.PRE_AUCTION.ITEM,
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
