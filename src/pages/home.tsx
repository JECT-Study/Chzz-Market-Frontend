import CategoryList from '@/components/home/CategoryList';
import HomeItem from '@/components/home/HomeItem';
import HomeItemList from '@/components/home/HomeItemList';
import Layout from '@/components/Layout';
import Navigation from '@/components/Navigation';
import RegisterBtn from '@/components/register/RegisterBtn';
import { useNavigate } from 'react-router-dom';
import { useScrollDetection } from '@/hooks/useScrollDetection';

const Home = () => {
  const navigate = useNavigate();
  const { isScrolled, elementRef } = useScrollDetection(0);

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>치즈 마켓</Layout.Header>
      <Layout.Main>
        <div
          ref={elementRef}
          className="relative flex flex-col w-full gap-4 overflow-y-scroll"
        >
          <HomeItemList name="베스트 경매">
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
          </HomeItemList>
          <HomeItemList name="종료 임박 경매">
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
          </HomeItemList>
          <HomeItemList name="카테고리">
            <CategoryList />
          </HomeItemList>
          <HomeItemList name="사전 등록 경매">
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
            <HomeItem />
          </HomeItemList>
          <RegisterBtn isScrolled={isScrolled} />
        </div>
      </Layout.Main>
      <Layout.Footer>
        <Navigation active="home" />
      </Layout.Footer>
    </Layout>
  );
};

export default Home;
