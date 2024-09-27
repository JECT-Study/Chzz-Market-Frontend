import { ReactNode, Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import GlobalSpinner from './GlobalSpinner';

const AsyncBoundary = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<GlobalSpinner />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
