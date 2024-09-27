import { useEffect, useRef, useState } from 'react';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { getToken } from '@/utils/tokenUtils';

export const useSSE = <T>(url: string) => {
  const [state, setState] = useState<T[]>([]);
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const eventSource = useRef<null | EventSource>(null);

  useEffect(() => {
    const fetchSSE = () => {
      eventSource.current = new EventSource(
        `${import.meta.env.VITE_API_URL}${url}`,
      );

      eventSource.current.onopen = () => {};

      eventSource.current.onerror = () => {
        eventSource.current?.close();
        setTimeout(fetchSSE, 3000);
      };

      eventSource.current.addEventListener('init', () => {});

      eventSource.current.addEventListener('notification', (e) => {
        const data = JSON.parse(e.data);
        setState((prev) => [...prev, data]);
      });
    };

    const token = getToken();
    if (token) fetchSSE();
    return () => eventSource.current?.close();
  }, [url, EventSource]);

  return { state, setState };
};
