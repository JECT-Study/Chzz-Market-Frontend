import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useEffect, useRef, useState } from 'react';

import { logout } from '@/features/auth/api/logout';
import { isLoggedIn } from '@/features/auth/model/authSlice';
import { RefreshHandler } from '@/shared/api/axios';
import { getToken } from '@/shared/utils/token';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export const useSSE = <T>(url: string) => {
  const [state, setState] = useState<T[]>([]);
  const navigate = useNavigate();
  const isLogin = useSelector(isLoggedIn);

  const EventSource = EventSourcePolyfill || NativeEventSource;
  const eventSource = useRef<null | EventSource>(null);

  useEffect(() => {
    const fetchSSE = () => {
      const accessToken = getToken();
      eventSource.current = new EventSource(
        `${import.meta.env.VITE_API_URL}${url}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          heartbeatTimeout: 120_000,
          withCredentials: true
        }
      );

      eventSource.current.onerror = async () => {
        try {
          const newAccessToken =
            await RefreshHandler.refreshTokenProcessQueue();
          if (newAccessToken) {
            eventSource.current?.close();
            setTimeout(fetchSSE, 1000);
          } else {
            throw new Error('토큰 갱신 실패');
          }
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
