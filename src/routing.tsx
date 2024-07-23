import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ROUTERS from '@/constants/route';
import MainPage from '@/pages/MainPage';
import Home from '@/pages/home';
import ProductList from '@/pages/ProductList';

const routeList = [
  {
    path: ROUTERS.MAIN,
    element: <MainPage />,
  },
  {
    path: ROUTERS.HOME,
    element: <Home />,
  },
  {
    path: ROUTERS.PRODUCT.LIST,
    element: <ProductList />,
  },
];

export const router = createBrowserRouter(
  routeList.map((item) => {
    return {
      ...item,
      element: <div>{item.element}</div>,
      // errorElement <Error> 만들기
    };
  }),
);

export default router;
