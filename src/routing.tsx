import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTERS } from './constant/route';
import MainPage from './pages/MainPage';

const routeList = [
  {
    path: ROUTERS.MAIN,
    element: <MainPage />,
  },
];

export const router = createBrowserRouter(
  routeList.map((item) => {
    return {
      ...item,
      element: <div>{item.element}</div>, // 추후 레이아웃으로 감싸기
      // errorElement <Error> 만들기
    };
  }),
);

export default router;
