import CategoryList from '../components/CategoryList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HomeItem from '../components/HomeItem';
import HomeItemList from '../components/HomeItemList';

function Home() {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <Header pageName="치즈 마켓" />
      <section className="flex flex-col w-full gap-4 px-8 py-4 overflow-y-scroll">
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
      </section>
      <Footer />
    </div>
  );
}

export default Home;
