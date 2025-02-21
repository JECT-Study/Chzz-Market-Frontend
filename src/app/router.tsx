import { GlobalLayout, LayoutWithNav } from "@/app/layout";

import { Home } from "@/pages/home/ui/Home";
import { ROUTES } from "@/shared/constants/routes";
import { AsyncBoundary } from "@/shared/ui/boundary/AsyncBoundary";
import { GlobalAsyncBoundary } from "@/shared/ui/boundary/GlobalAsyncBoundary";
import { RouteErrorFallback } from "@/shared/ui/boundary/RouteErrorFallback";
import { PrivateRoute } from "@/shared/ui/route/PrivateRoute";
import { PublicRoute } from "@/shared/ui/route/PublicRoute";
import { RouteLoader } from "@/shared/utils/RouteLoader";
import { lazy } from "react";
import { createBrowserRouter } from 'react-router';

const AuctionDetails = lazy(() => import('@/pages/details/ui/AuctionDetails').then(module => ({ default: module.AuctionDetails })));
const PreAuctionDetails = lazy(() => import('@/pages/details/ui/PreAuctionDetails').then(module => ({ default: module.PreAuctionDetails })));
const Register = lazy(() => import('@/pages/register/Register').then((module) => ({ default: module.Register })))
const Test = lazy(() => import('@/pages/Test').then((module) => ({ default: module.Test })))
const Heart = lazy(() => import('@/pages/heart/Heart').then((module) => ({ default: module.Heart })))
const Notification = lazy(() => import('@/pages/notification/Notification').then((module) => ({ default: module.Notification })))
const User = lazy(() => import('@/pages/user/ui/User').then(module => ({ default: module.User })));
const UserRegisteredList = lazy(() => import('@/pages/user/ui/UserRegisteredList').then(module => ({ default: module.UserRegisteredList })));
const UserPreRegisteredList = lazy(() => import('@/pages/user/ui/UserPreRegisteredList').then(module => ({ default: module.UserPreRegisteredList })));
const UserParticipatedList = lazy(() => import('@/pages/user/ui/UserParticipatedList').then(module => ({ default: module.UserParticipatedList })));
const UserProfileEdit = lazy(() => import('@/pages/user/ui/UserProfileEdit').then(module => ({ default: module.UserProfileEdit })));
const Bid = lazy(() => import('@/pages/bid/Bid').then((module) => ({ default: module.Bid })))
const BidderList = lazy(() => import('@/pages/bidder-list/ui/BidderList').then((module) => ({ default: module.BidderList })));
const Login = lazy(() => import('@/pages/login/Login').then((module) => ({ default: module.Login })));
const ProductList = lazy(() => import('@/pages/product-list/ProductList').then((module) => ({ default: module.ProductList })));
const Payment = lazy(() => import('@/pages/payment/ui/Payment').then(module => ({ default: module.Payment })));
const PaymentSuccess = lazy(() => import('@/pages/payment/ui/PaymentSuccess').then(module => ({ default: module.PaymentSuccess })));
const PaymentAddressList = lazy(() => import('@/pages/payment/ui/PaymentAddressList').then(module => ({ default: module.PaymentAddressList })));
const PaymentAddressAdd = lazy(() => import('@/pages/payment/ui/PaymentAddressAdd').then(module => ({ default: module.PaymentAddressAdd })));
const PaymentAddressEdit = lazy(() => import('@/pages/payment/ui/PaymentAddressEdit').then(module => ({ default: module.PaymentAddressEdit })));
const PaymentAddressEditList = lazy(() => import('@/pages/payment/ui/PaymentAddressEditList').then(module => ({ default: module.PaymentAddressEditList })));
const EditAuction = lazy(() => import('@/pages/edit-auction/EditAuction').then(module => ({ default: module.EditAuction })));
const AuctionSearch = lazy(() => import('@/pages/search/ui/AuctionSearch').then(module => ({ default: module.AuctionSearch })));
const Signup = lazy(() => import('@/pages/sign-up/Signup').then(module => ({ default: module.Signup })));

const layoutWithNavRouteList = [
  {
    path: ROUTES.HOME,
    element: <Home />
  },
  {
    path: ROUTES.NOTIFICATION,
    element: <Notification />
  },
  {
    path: ROUTES.HEART,
    element: <Heart />
  },
  {
    path: ROUTES.USER.HOME,
    element: <User />
  },
  {
    path: ROUTES.USER.REGISTERED_LIST,
    element: <UserRegisteredList />
  },
  {
    path: ROUTES.USER.PRE_REGISTERED_LIST,
    element: <UserPreRegisteredList />
  },
  {
    path: ROUTES.USER.PARTICIPATED_LIST,
    element: <UserParticipatedList />
  }
];

const privateRouteList = [
  {
    path: ROUTES.REGISTER,
    element: <Register />
  },
  {
    path: ROUTES.BID,
    element: <Bid />,
    loader: RouteLoader
  },
  {
    path: ROUTES.BIDDER_LIST,
    element: <BidderList />,
    loader: RouteLoader
  },
  {
    path: ROUTES.USER.PROFILE_EDIT,
    element: <UserProfileEdit />
  },

  {
    path: ROUTES.PRE_AUCTION.EDIT,
    element: (
      <AsyncBoundary header='사전 경매 수정하기'>
        <EditAuction />
      </AsyncBoundary>
    ),
    loader: RouteLoader
  },
  {
    path: ROUTES.PAYMENT.HOME,
    element: <Payment />
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
    element: <Signup />
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />
  }
];

export const router = createBrowserRouter([
  {
    element: (
      <GlobalAsyncBoundary>
        <GlobalLayout />
      </GlobalAsyncBoundary>
    ),
    errorElement: <RouteErrorFallback />,
    children: [
      {
        element: <LayoutWithNav />,
        children: layoutWithNavRouteList.map(({ path, element }) => ({
          path,
          element: (
            <AsyncBoundary >
              {path === '/' ? element : <PrivateRoute>{element}</PrivateRoute>}
            </AsyncBoundary>
          )
        }))
      },

      ...privateRouteList.map(({ path, element, loader }) => ({
        path,
        element: <PrivateRoute>{element}</PrivateRoute>,
        ...(loader && { loader })
      })),

      ...publicRouteList.map(({ path, element }) => ({
        path,
        element: <PublicRoute>{element}</PublicRoute>
      })),

      {
        path: ROUTES.PRODUCT_LIST,
        element: (
          <AsyncBoundary>
            <ProductList />
          </AsyncBoundary>
        )
      },
      {
        path: ROUTES.AUCTION.ITEM,
        element: <AuctionDetails />,
        loader: RouteLoader
      },
      {
        path: ROUTES.PRE_AUCTION.ITEM,
        element: <PreAuctionDetails />,
        loader: RouteLoader
      },
      {
        path: `/test`,
        element: <Test />
      },
      {
        path: ROUTES.AUCTION_SEARCH,
        element: <AuctionSearch />
      }
    ]
  }
])

export default router;
