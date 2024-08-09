import { Window } from '@/models/kakao';
import { useEffect } from 'react';

const useKakaoInit = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if ((window as Window).Kakao) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).Kakao.init('08e20c9a857cf9fa39b6a6cf30cddd23');
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default useKakaoInit;
