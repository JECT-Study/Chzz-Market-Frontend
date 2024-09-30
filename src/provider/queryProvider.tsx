import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from 'sonner';
import { useState } from 'react';
import { AxiosError } from 'axios';

interface ReactQueryProviderProps {
  children: React.ReactNode;
  showDevTools?: boolean;
}

const ReactQueryProvider = ({ showDevTools = false, children }: ReactQueryProviderProps) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retryOnMount: true,
          refetchOnReconnect: false,
          retry: false,
        },
        mutations: {
          throwOnError: false,
          onError: (error) => {
            if (error instanceof AxiosError && error.response) {
              toast.error(error.response.data.message);
            } else {
              toast.error('예기치 못한 에러 발생');
            }
          },
        },
      },
    })
  );
  return (
    <QueryClientProvider client={client}>
      {showDevTools && <ReactQueryDevtools buttonPosition='bottom-left' />}
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
