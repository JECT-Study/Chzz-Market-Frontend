import { AsyncBoundary, GlobalAsyncBoundary, PrivateRoute, PublicRoute, ROUTES, RouteErrorFallback } from '@/shared';
import { AuctionDetails, PreAuctionDetails, auctionDetailsLoader, preAuctionDetailsLoader } from "@/pages/details";
import { Bid, bidLoader } from "@/pages/bid";
import { BidderList, bidderListLoader } from "@/pages/bidder-list";
import { EditAuction, editAuctionLoader } from "@/pages/edit-auction";
import { GlobalLayout, LayoutWithNav } from "@/app/layout";
import { Payment, PaymentAddressAdd, PaymentAddressEdit, PaymentAddressEditList, PaymentAddressList, PaymentSuccess } from "@/pages/payment";
import { User, UserParticipatedList, UserPreRegisteredList, UserProfileEdit, UserRegisteredList } from "@/pages/user";

import { AuctionSearch } from "@/pages/search";
import { Heart } from "@/pages/heart";
import { Home } from "@/pages/home";
import { Login } from "@/pages/login";
import { Notification } from "@/pages/notification";
import { ProductList } from "@/pages/product-list";
import { Register } from "@/pages/register";
import { Signup } from "@/pages/sign-up";
import { Test } from "@/pages/Test";
import { createBrowserRouter } from 'react-router-dom';

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
    loader: bidLoader
  },
  {
    path: ROUTES.BIDDER_LIST,
    element: <BidderList />,
    loader: bidderListLoader
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
    loader: editAuctionLoader
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
        loader: auctionDetailsLoader
      },
      {
        path: ROUTES.PRE_AUCTION.ITEM,
        element: <PreAuctionDetails />,
        loader: preAuctionDetailsLoader
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
]);

export default router;
