import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './router';

const App = () => {
  useEffect(() => {
    const setVh = () => {
      // innerHeight에 기반하여 1vh를 px로 계산
      const vh = window.innerHeight * 0.01;

      // HTML 루트에 CSS 변수 세팅
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();

    // 윈도우 사이즈 바뀔 때마다 변수 갱신
    window.addEventListener('resize', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);

  return <RouterProvider router={router} />;
};
export default App;