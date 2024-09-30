import { ReactNode, Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import GlobalSpinner from './GlobalSpinner';
import { useLocation } from 'react-router-dom';

const AsyncBoundary = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[pathname]}>
      <Suspense fallback={<GlobalSpinner />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
