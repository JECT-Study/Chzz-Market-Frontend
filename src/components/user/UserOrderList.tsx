import { useAuth } from '@/hooks/useAuth';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const userList = [
  { id: 1, title: '내가 등록한 경매 내역' },
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
  const navigate = useNavigate();

  const handleItemClick = (title: string) => {
    if (title === '내가 등록한 경매 내역') {
      navigate('registered/list');
    } else if (title === '설정') {
      // navigate('user/settings');
    } else if (title === '로그아웃') {
      handleLogout();
    }
  };

  return (
    <div className="flex flex-col">
      {userList.map((item) => (
        <div
          key={item.id}
          className="w-full flex justify-between py-2 border-b border-b-gray3"
          onClick={() => handleItemClick(item.title)}
        >
          <h2 className="text-lg font-medium">{item.title}</h2>
          <IoIosArrowForward className="text-2xl" />
        </div>
      ))}
    </div>
  );
};

export default UserOrderList;
