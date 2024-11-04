import { ReactNode, Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import ErrorIcon from '@/shared/assets/icons/error.svg';
import { EmptyError } from '@/shared/lib';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { EmptyFallback } from '..';
import { Button } from '../Button';
import { LocalSpinner } from '../spinner';

interface FallbackComponentProps extends FallbackProps {
  height: number
}

const FallbackComponent = ({ error, resetErrorBoundary, height }: FallbackComponentProps) => {
  if (error instanceof EmptyError) {
    return <EmptyFallback emptyName={error.message} />
  }

  if (!isAxiosError(error)) throw error

  return (
    <div className={`flex flex-col items-center justify-center w-full h-[${height}px] gap-3 p-5 border rounded bg-error`}>
      <img src={ErrorIcon} alt='에러 아이콘' className='web:size-8 size-6' />
      <div className='space-y-2 text-center'>
        <h2 className='web:text-body2 text-caption text-gray2'>데이터를 불러오는 도중
          문제가 발생했습니다.</h2>
      </div>
      <Button type='button' color='cheeseYellow' className='text-xs web:text-smallBtn' onClick={resetErrorBoundary}>
        다시 불러오기
      </Button>
    </div>
  );
};

export const LocalAPIAsyncBoundary = ({ children, height }: { children: ReactNode, height: number }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (<ErrorBoundary onReset={reset} FallbackComponent={(props) => <FallbackComponent height={height} {...props} />}>
        <Suspense fallback={<LocalSpinner height={height} />}>
          {children}
        </Suspense>
      </ErrorBoundary>)}
    </QueryErrorResetBoundary>
  );
};