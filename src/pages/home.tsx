import CategoryList from '../components/CategoryList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HomeItem from '../components/HomeItem';
import HomeItemList from '../components/HomeItemList';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout header={<Header name="치즈 마켓" />} footer={<Footer />}>
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
    </Layout>
  );
};

export default Home;
