import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import AllOrderTab from '@/components/mypage/AllOrderTab';
import { useState } from 'react';

const myPageFooter = (
  <Footer>
    <nav className="flex items-center h-full">
      <div className="flex justify-center items-center w-[11.25rem] h-[3.75rem]">
        <img
          src="/home_on.svg"
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
          alt="heartOn"
          className="cursor-pointer size-7"
        />
      </div>
      <div className="flex justify-center items-center w-[11.25rem] h-[3.75rem]">
        <img src="/my_off.svg" alt="myOff" className="cursor-pointer size-7" />
      </div>
    </nav>
  </Footer>
);

const AllOrderList = () => {
  const [activeTab, setActiveTab] = useState(true);
  return (
    <Layout header={<Header path="/">마이페이지</Header>} footer={myPageFooter}>
      <AllOrderTab activeTab={activeTab} setActiveTab={setActiveTab} />
    </Layout>
  );
};

export default AllOrderList;
