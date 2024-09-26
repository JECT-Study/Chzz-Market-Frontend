import ProductListPage from '@/pages/ProductList';
import ROUTERS from '@/constants/route';
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Bid, { loader as bidLoader } from './pages/Bid';
import BidderList, { loader as bidderListLoader } from './pages/BidderList';

import AddressBook from './pages/AddressBook';
import DetailPage from './pages/DetailPage';
import GlobalLayout from './components/layout/GlobalLayout';
import Heart from './pages/Heart';
import Home from './pages/Home';
import LoadingSpinner from './components/common/loading/LoadingSpinner';
import Login from './pages/Login';
import NavigationLayout from './components/layout/NavigationLayout';
import Notification from './pages/Notification';
import User from './pages/User';
import OrderHistory from './pages/OrderHistory';
import ProfileEdit from './pages/ProfileEdit';
import Register from './pages/Register';
import Signup from './pages/Signup';
import UserRegisteredList from './pages/UserRegisteredList';

const routeList = [
  {
    element: <GlobalLayout />,
    children: [
      {
        element: (
          <Suspense fallback={<LoadingSpinner text="Global" />}>
            <NavigationLayout />
          </Suspense>
        ),
        children: [
          {
            path: ROUTERS.HOME,
            element: (
              <Suspense fallback={<LoadingSpinner text="home" />}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: ROUTERS.HEART,
            element: (
              <Suspense fallback={<LoadingSpinner text="HEART" />}>
                <Heart />
              </Suspense>
            ),
          },
          {
            path: ROUTERS.NOTIFICATION,
            element: <Notification />,
          },
          {
            path: ROUTERS.USER,
            element: <User />,
          },
        ],
      },
      {
        path: `${ROUTERS.BID}`,
        element: (
          <Suspense
            fallback={<LoadingSpinner title="경매 참여하기" text="Bid" />}
          >
            <Bid />
          </Suspense>
        ),
        loader: bidLoader,
      },
      {
        path: `${ROUTERS.FINAL_BIDDER_LIST}`,
        element: (
          <Suspense
            fallback={
              <LoadingSpinner title="경매 참여자 목록" text="Bidder list" />
            }
          >
            <BidderList />
          </Suspense>
        ),
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
