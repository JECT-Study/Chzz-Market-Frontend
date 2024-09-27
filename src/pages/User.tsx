import UserOrder from '@/components/user/UserOrder';
import UserOrderList from '@/components/user/UserOrderList';
import UserProfile from '@/components/user/UserProfile';
import LoginProvider from '@/provider/loginProvider';

const User = () => {
  // const [value, setValue] = useState<{
  //   roadAddress: string;
  //   jibun: string;
  //   zonecode: string;
  // }>({
  //   roadAddress: '',
  //   jibun: '',
  //   zonecode: '',
  // });

  return (
    <LoginProvider>
      <div className="flex flex-col">
        <UserProfile />
        <UserOrder />
        <UserOrderList />
      </div>
    </LoginProvider>
  );
};

export default User;
