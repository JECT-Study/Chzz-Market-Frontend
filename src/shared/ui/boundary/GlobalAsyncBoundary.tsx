import { ReactNode, Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import { Layout } from '@/app/layout/ui/Layout';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import ErrorIcon from '../../assets/icons/error.svg';
import { getErrorByCode } from '../../utils/getErrorByCode';
import { Button } from '../Button';
import { GlobalSpinner } from '../spinner/GlobalSpinner';

const FallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { title, description } = getErrorByCode(error)
  const navigate = useNavigate()
  const handleClick = () => {
    if (error.code === '403') navigate('/')
    resetErrorBoundary()
  }

  return (
    <div
      className="flex justify-center w-full"
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      <div className="relative h-full w-web min-w-mobile">
        <Layout>
          <Layout.Header title="치즈 마켓" />
          <Layout.Main>
            <div className="flex flex-col items-center min-w-[10rem] justify-center h-full gap-5">
              <img src={ErrorIcon} alt="에러 아이콘" />
              <div className="space-y-2 text-center">
                <h2 className="web:text-heading2 text-heading3 text-gray1">
                  {title}
                </h2>
                <p className="text-gray2 text-body2">{description}</p>
              </div>
            </div>
          </Layout.Main>
          <Layout.Footer type='single'>
            <Button type='button' color='cheeseYellow' className='w-full h-full' onClick={handleClick}>
              {error.code === '403' ? '홈으로 가기' : '다시 시도하기'}
            </Button>
          </Layout.Footer>
        </Layout>
      </div>
    </div>
  );
};

export const GlobalAsyncBoundary = ({ children }: { children: ReactNode }) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={FallbackComponent}>
      <Suspense fallback={<GlobalSpinner />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
