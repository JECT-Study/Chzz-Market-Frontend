import { useNavigate } from 'react-router';
import MainImage from '@/assets/icons/main_cheese_icon.svg';
import Layout from '../../layout/Layout';
import Button from '../Button';

const NotFound = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate('/');
  return (
    <div className='flex justify-center w-full h-screen'>
      <div className='relative w-[46rem] min-w-[23rem] h-full'>
        <Layout>
          <Layout.Header title='잘못된 페이지' handleBack={handleBack} />
          <Layout.Main>
            <div className='flex flex-col items-center justify-center h-full gap-5'>
              <img src={MainImage} alt='메인 로고' />
              <h1 className=' text-heading1 text-cheeseYellow'>잘못된 페이지입니다.</h1>
              <Button onClick={handleBack} type='button' color='cheeseYellow'>
                홈으로 가기
              </Button>
            </div>
          </Layout.Main>
        </Layout>
      </div>
    </div>
  );
};

export default NotFound;
