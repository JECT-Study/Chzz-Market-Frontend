import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { getErrorByCode } from '@/shared/utils/getErrorByCode';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

interface ReactQueryProviderProps {
  children: React.ReactNode;
  showDevTools?: boolean;
}

export const ReactQueryProvider = ({
  showDevTools = false,
  children
}: ReactQueryProviderProps) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retryOnMount: true,
          refetchOnReconnect: false,
          retry: false,
          throwOnError: true
        },
        mutations: {
          throwOnError: false,
          onError: (error) => {
            if (error instanceof AxiosError) {
              const { description } = getErrorByCode(error);
              toast.error(description);
            }
          }
        }
      }
    })
  );
  return (
    <QueryClientProvider client={client}>
      {showDevTools && <ReactQueryDevtools buttonPosition="bottom-left" />}
      {children}
    </QueryClientProvider>
  );
};
