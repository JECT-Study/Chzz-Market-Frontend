import { ReactNode, Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import ErrorIcon from '@/shared/assets/icons/error.svg';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useLocation } from 'react-router-dom';
import { getErrorByCode } from '../../utils/getErrorByCode';
import { Button } from '../Button';
import { GlobalSpinner } from '../spinner';

const FallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { title, description } = getErrorByCode(error)
  if (!isAxiosError(error)) throw error

  return (
    <div className='flex flex-col items-center min-w-[10rem] justify-center h-full gap-5'>
      <img src={ErrorIcon} alt='에러 아이콘' />
      <div className='space-y-2 text-center'>
        <h2 className='sm:text-heading2 text-heading3 text-gray1'>{title}</h2>
        <p className='text-gray2 text-body2'>{description}</p>
      </div>
      <Button type='button' color='cheeseYellow' className='' onClick={resetErrorBoundary}>
        다시 불러오기
      </Button>
    </div>
  );
};

export const APIAsyncBoundary = ({ children }: { children: ReactNode }) => {
  const { pathname, key } = useLocation();

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (<ErrorBoundary onReset={reset} FallbackComponent={FallbackComponent} resetKeys={[pathname, key]}>
        <Suspense fallback={<GlobalSpinner />}>
          {children}
        </Suspense>
      </ErrorBoundary>)}
    </QueryErrorResetBoundary>
  );
};