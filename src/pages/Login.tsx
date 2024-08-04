import Header from '@/components/Header';
import Layout from '@/components/Layout';
import Button from '@/components/common/Button';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';

const Login = () => {
  return (
    <Layout header={<Header path="/" />}>
      <div className="h-full flex flex-col items-center">
        {/* <img /> */}
        <div className="w-full">
          <Button
            className="relative flex w-full justify-center items-center bg-mainCheeseYellow border-none rounded-md mb-3"
            size="large"
            color="white"
          >
            <RiKakaoTalkFill className="absolute left-3 text-2xl" />
            <p>카카오톡으로 시작하기</p>
          </Button>
          <Button
            className="relative flex w-full justify-center items-center bg-mainCheeseYellow border-none rounded-md"
            size="large"
            color="white"
          >
            <SiNaver className="absolute left-3 text-2xl text-white" />
            <p>네이버로 시작하기</p>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
