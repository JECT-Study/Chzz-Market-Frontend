import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import MyPageOrder from '@/components/mypage/MyPageOrder';
import MyPageOrderList from '@/components/mypage/MyPageOrderList';
import MyPageProfile from '@/components/mypage/MyPageProfile';

const myPageFooter = (
  <Footer>
    <nav className="flex items-center h-full">
      <div className="flex justify-center items-center w-[11.25rem] h-[3.75rem]">
        <img
          src="/home_off.svg"
          alt="homeOff"
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
        <img src="/my_on.svg" alt="myOn" className="cursor-pointer size-7" />
      </div>
    </nav>
  </Footer>
);

const MyPage = () => {
  return (
    <Layout header={<Header path="/">마이페이지</Header>} footer={myPageFooter}>
      <div className="flex flex-col">
        <MyPageProfile />
        <MyPageOrder />
        <MyPageOrderList />
      </div>
    </Layout>
  );
};

export default MyPage;
