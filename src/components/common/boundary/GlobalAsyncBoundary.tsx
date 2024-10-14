import { ReactNode, Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import ErrorIcon from '@/assets/icons/error.svg';
import Layout from '@/components/layout/Layout';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import Button from '../Button';
import { getErrorByCode } from '../error/ErrorCode';
import GlobalSpinner from '../loading/GlobalSpinner';

const FallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { title, description } = getErrorByCode(error)

  return (
    <div className='flex justify-center w-full h-screen'>
      <div className='relative w-[46rem] min-w-[23rem] h-full'>
        <Layout>
          <Layout.Main>
            <div className='flex flex-col items-center min-w-[10rem] justify-center h-full gap-5'>
              <img src={ErrorIcon} alt='에러 아이콘' />
              <div className='space-y-2 text-center'>
                <h2 className='sm:text-heading2 text-heading3 text-gray1'>{title}</h2>
                <p className='text-gray2 text-body2'>{description}</p>
              </div>
            </div>
          </Layout.Main>
          <Layout.Footer type='single'>
            <Button type='button' color='cheeseYellow' className='w-full h-full' onClick={resetErrorBoundary}>
              다시 시도하기
            </Button>
          </Layout.Footer>
        </Layout>
      </div>
    </div>
  );
};

const GlobalAsyncBoundary = ({ children }: { children: ReactNode }) => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={FallbackComponent}>
      <Suspense fallback={<GlobalSpinner />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default GlobalAsyncBoundary;
