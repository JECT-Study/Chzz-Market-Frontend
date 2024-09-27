import Layout from '@/components/layout/Layout';
import UserOrder from '@/components/user/UserOrder';
import UserOrderList from '@/components/user/UserOrderList';
import UserProfile from '@/components/user/UserProfile';
import Navigation from '@/components/navigation/Navigation';
import LoginProvider from '@/provider/loginProvider';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();
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
