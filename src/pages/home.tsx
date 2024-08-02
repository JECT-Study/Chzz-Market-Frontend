import CategoryList from '@/components/CategoryList';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HomeItem from '@/components/HomeItem';
import HomeItemList from '@/components/HomeItemList';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const Home = () => {
  const HomeFooter = (
    <Footer>
      <nav className="flex items-center h-full">
        <div className="flex justify-center items-center w-[11.25rem] h-[3.75rem]">
          <img
            src="/home_on.svg"
            alt="homeOn"
            className="cursor-pointer size-7"
          />
        </div>
        <div className="flex justify-center items-center w-[11.25rem] h-[3.75rem]">
          <img
            src="/notice_off.svg"
            alt="noticeOff"
            className="cursor-pointer size-7"
          />
        </div>
        <div className="flex justify-center items-center w-[11.25rem] h-[3.75rem]">
          <img
            src="/heart_off.svg"
            alt="heartOff"
            className="cursor-pointer size-7"
          />
        </div>
        <div className="flex justify-center items-center w-[11.25rem] h-[3.75rem]">
          <img
            src="/my_off.svg"
            alt="myOff"
            className="cursor-pointer size-7"
          />
        </div>
      </nav>
    </Footer>
  );
  return (
    <Layout header={<Header path="/">치즈 마켓</Header>} footer={HomeFooter}>
      <Link to="/register">등록</Link>
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
