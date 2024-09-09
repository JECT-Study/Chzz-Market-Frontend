import { useAuth } from '@/hooks/useAuth';
import { IoIosArrowForward } from 'react-icons/io';

const userList = [
  { id: 1, title: '모든 등록 내역' },
  {
    id: 2,
    title: '설정',
  },
  {
    id: 3,
    title: '로그아웃',
  },
];

const UserOrderList = () => {
  const { handleLogout } = useAuth();

  return (
    <div className="flex flex-col">
      {userList.map((item) => (
        <div
          key={item.id}
          className="w-full flex justify-between py-2 border-b border-b-gray3"
          onClick={item.title === '로그아웃' ? handleLogout : undefined}
        >
          <h2 className="text-lg font-medium">{item.title}</h2>
          <IoIosArrowForward className="text-2xl" />
        </div>
      ))}
    </div>
  );
};

export default UserOrderList;
