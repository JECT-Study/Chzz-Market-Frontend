import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useEffect, useRef, useState } from 'react';

import { getToken } from '@/utils/tokenUtils';

export const useSSE = <T>(url: string) => {
  const [state, setState] = useState<T[]>([]);
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const eventSource = useRef<null | EventSource>(null);

  useEffect(() => {
    const fetchSSE = () => {
      const accessToken = getToken();
      if (accessToken) {
        eventSource.current = new EventSource(`${import.meta.env.VITE_API_URL}${url}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });

        eventSource.current.onopen = () => {};

        eventSource.current.onerror = (error) => {
          eventSource.current?.close();
          setTimeout(fetchSSE, 3000);
        };

        eventSource.current.addEventListener('init', () => {});

        eventSource.current.addEventListener('notification', (e) => {
          const data = JSON.parse(e.data);
          setState((prev) => [...prev, data]);
        });
      }
      return () => eventSource.current?.close();
    };

    fetchSSE();
  }, [url, EventSource]);

  return { state, setState };
};
