import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './router';

const App = () => {
  useEffect(() => {
    const updateHeight = () => {
      const { height } = window.visualViewport ?? {};
      if (height) {
        document.documentElement.style.setProperty('--vh', `${height * 0.01}px`);
      }
    };

    window.visualViewport?.addEventListener('resize', updateHeight);
    updateHeight();

    return () => {
      window.visualViewport?.removeEventListener('resize', updateHeight);
    };
  }, []);

  return <RouterProvider router={router} />;
};
export default App;
