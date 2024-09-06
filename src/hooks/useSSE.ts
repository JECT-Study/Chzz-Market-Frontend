import { useEffect, useState } from 'react';

export const useSSE = <T>(url: string) => {
  const [state, setState] = useState<T[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      // console.log('SSE Connection opened!');
    };
    eventSource.onerror = (error) =>
      // console.error('SSE Connection error!', error);

      eventSource.addEventListener('init', (e) => {
        // console.log(e.data);
      });
    eventSource.addEventListener('notification', (e) => {
      const data = JSON.parse(e.data);
      setState((prev) => [...prev, data]);
    });

    return () => eventSource.close();
  }, [url]);

  return { state, setState };
};
