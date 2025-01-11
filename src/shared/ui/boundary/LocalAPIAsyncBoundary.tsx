import { ReactNode, Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import ErrorIcon from '@/shared/assets/icons/error.svg';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { Button } from '../Button';
import { LocalSpinner } from '../spinner';


const FallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
  if (!isAxiosError(error)) throw error

  return (
    <div className={`flex flex-col items-center justify-center w-full min-h-28 gap-3 p-5 border rounded bg-error`}>
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

export const LocalAPIAsyncBoundary = ({ children }: { children: ReactNode }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (<ErrorBoundary onReset={reset} FallbackComponent={(props) => <FallbackComponent  {...props} />}>
        <Suspense fallback={<LocalSpinner />}>
          {children}
        </Suspense>
      </ErrorBoundary>)}
    </QueryErrorResetBoundary>
  );
};