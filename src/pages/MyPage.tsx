import MyPageOrder from '@/components/mypage/MyPageOrder';
import MyPageOrderList from '@/components/mypage/MyPageOrderList';
import MyPageProfile from '@/components/mypage/MyPageProfile';
import LoginProvider from '@/provider/loginProvider';

const MyPage = () => {
  return (
    <LoginProvider>
      <div className="flex flex-col">
        <MyPageProfile />
        <MyPageOrder />
        <MyPageOrderList />
      </div>
    </LoginProvider>
  );
};

export default MyPage;
