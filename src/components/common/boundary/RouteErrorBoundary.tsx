import MainImage from '@/assets/icons/main_cheese_icon.svg';
import Layout from '@/components/layout/Layout';
import { useNavigate } from 'react-router';
import Button from '../Button';

const RouteErrorBoundary = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate('/', { replace: true });

  return (
    <div className='flex justify-center w-full h-screen'>
      <div className='relative w-[46rem] min-w-[23rem] h-full'>
        <Layout>
          <Layout.Header title='치즈 마켓' />
          <Layout.Main>
            <div className='flex flex-col items-center justify-center h-full gap-5'>
              <img src={MainImage} alt='메인 로고' />
              <h1 className=' text-heading1 text-cheeseYellow'>페이지를 찾을 수 없습니다.</h1>
            </div>
          </Layout.Main>
          <Layout.Footer type='single'>
            <Button onClick={handleBack} type='button' className='w-full' color='cheeseYellow'>
              홈으로 가기
            </Button>
          </Layout.Footer>
        </Layout>
      </div>
    </div>
  );
};

export default RouteErrorBoundary;
