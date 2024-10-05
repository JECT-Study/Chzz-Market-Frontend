import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useEffect, useRef, useState } from 'react';

import { getToken } from '@/utils/tokenUtils';
import { isLoggedIn } from '@/store/authSlice';
import { logout, refreshToken } from '@/components/login/queries';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useSSE = <T>(url: string) => {
  const [state, setState] = useState<T[]>([]);
  const navigate = useNavigate();
  const isLogin = useSelector(isLoggedIn);

  const EventSource = EventSourcePolyfill || NativeEventSource;
  const eventSource = useRef<null | EventSource>(null);

  useEffect(() => {
    const fetchSSE = () => {
      const accessToken = getToken();
      eventSource.current = new EventSource(`${import.meta.env.VITE_API_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        heartbeatTimeout: 2_100_000,
        withCredentials: true,
      });

      eventSource.current.onerror = async () => {
        try {
          await refreshToken();
          eventSource.current?.close();
          setTimeout(fetchSSE, 1000);
        } catch (error) {
          await logout();
          navigate('/login');
        }
      };

      eventSource.current.addEventListener('notification', (e) => {
        const data = JSON.parse(e.data);
        setState((prev) => [...prev, data]);
      });
    };

    if (isLogin) fetchSSE();

    return () => eventSource.current?.close();
  }, [url, isLogin]);

  return { state, setState };
};
