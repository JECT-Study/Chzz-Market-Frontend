import NotFoundIcon from '@/assets/icons/404_sign.svg';
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
              <img src={NotFoundIcon} alt='NotFoundLogo' className='size-40' />
              <div className='flex flex-col items-center justify-center gap-1'>
                <h2 className='text-heading2 text-gray1'>원하시는 페이지를 찾을 수 없습니다.</h2>
                <p className='text-body2Bold text-gray2'>입력하신 주소를 다시 확인해주세요.</p>
              </div>
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
