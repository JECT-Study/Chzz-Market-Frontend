import { ReactNode, Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import { Layout } from '@/app/layout';
import ErrorIcon from '@/shared/assets/icons/error.svg';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useLocation } from 'react-router-dom';
import { getErrorByCode } from '../../utils/getErrorByCode';
import { Button } from '../Button';
import { GlobalSpinner } from '../spinner';

interface FallbackComponentProps extends FallbackProps {
  header?: string;
}

const FallbackComponent = ({
  error,
  resetErrorBoundary,
  header
}: FallbackComponentProps) => {
  const { title, description } = getErrorByCode(error);
  if (!isAxiosError(error)) throw error;

  return (
    <Layout>
      {header && <Layout.Header title={header} />}
      <div className="flex flex-col items-center justify-center w-full h-full gap-3 px-10">
        <img src={ErrorIcon} alt="에러 아이콘" />
        <div className="space-y-2 text-center">
          <h2 className="web:text-heading2 text-heading3 text-gray1">
            {title}
          </h2>
          <p className=" text-gray2 web:text-body1 text-body2">{description}</p>
        </div>
      </div>
      <Layout.Footer type="single">
        <Button
          type="button"
          color="cheeseYellow"
          className="w-full h-full"
          onClick={resetErrorBoundary}
        >
          다시 불러오기
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export const AsyncBoundary = ({
  children,
  header
}: {
  children: ReactNode;
  header?: string;
}) => {
  const { pathname, key } = useLocation();
  const spinner = header && (
    <Layout>
      <Layout.Header title={header} />
      <GlobalSpinner />
    </Layout>
  );

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={(props) => (
            <FallbackComponent {...props} header={header} />
          )}
          resetKeys={[pathname, key]}
        >
          <Suspense fallback={spinner}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
