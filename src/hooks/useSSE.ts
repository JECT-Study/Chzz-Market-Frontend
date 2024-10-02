import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useEffect, useRef, useState } from 'react';

import { getToken } from '@/utils/tokenUtils';
import { isLoggedIn } from '@/store/authSlice';
import { refreshToken } from '@/components/login/queries';
import { useSelector } from 'react-redux';

export const useSSE = <T>(url: string) => {
  const [state, setState] = useState<T[]>([]);
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const eventSource = useRef<null | EventSource>(null);
  const accessToken = getToken();
  const isLogin = useSelector(isLoggedIn);

  useEffect(() => {
    const fetchSSE = () => {
      eventSource.current = new EventSource(`${import.meta.env.VITE_API_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        heartbeatTimeout: 2_100_000,
        withCredentials: true,
      });

      eventSource.current.onopen = () => {};

      eventSource.current.onerror = () => {
        refreshToken();
        eventSource.current?.close();
        setTimeout(fetchSSE, 3000);
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
