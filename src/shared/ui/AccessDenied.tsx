import { Layout } from '@/app/layout/index';
import ErrorIcon from '@/shared/assets/icons/error.svg';
import { useNavigate } from 'react-router';
import { Button } from './Button';

export const AccessDenied = () => {
  const navigate = useNavigate();
  const handleHome = () => navigate('/', { replace: true });

  return (
    <div className='flex justify-center w-full h-screen'>
      <div className='relative w-[46rem] min-w-[23rem] h-full'>
        <Layout>
          <Layout.Header title='치즈 마켓' />
          <Layout.Main>
            <div className='flex flex-col items-center justify-center h-full gap-5'>
              <img src={ErrorIcon} alt='에러 아이콘' className='sm:size-14 size-10' />
              <div className='flex flex-col items-center justify-center gap-1'>
                <h2 className='text-heading2 text-gray1'>접근이 제한된 페이지입니다</h2>
                <p className='text-body2Bold text-gray2'>이 페이지에 접근할 권한이 없습니다.</p>
              </div>
            </div>
          </Layout.Main>
          <Layout.Footer type='single'>
            <Button onClick={handleHome} type='button' className='w-full' color='cheeseYellow'>
              홈으로 가기
            </Button>
          </Layout.Footer>
        </Layout>
      </div>
    </div>
  );
};