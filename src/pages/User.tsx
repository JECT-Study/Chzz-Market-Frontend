import UserOrder from '@/components/user/UserOrder';
import UserOrderList from '@/components/user/UserOrderList';
import UserProfile from '@/components/user/UserProfile';

const User = () => {
  return (
    <div className='flex flex-col'>
      <UserProfile />
      <UserOrder />
      <UserOrderList />
    </div>
  );
};

export default User;
