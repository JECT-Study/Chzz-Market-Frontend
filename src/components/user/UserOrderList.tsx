import ROUTERS from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const userList = [
  {
    id: 1,
    title: '로그아웃',
  },
];

const UserOrderList = () => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleItemClick = (title: string) => {
    if (title === '내가 등록한 경매 내역') {
      navigate(ROUTERS.REGISTERED_LIST);
    } else if (title === '로그아웃') {
      handleLogout();
    }
  };

  return (
    <div className='mt-10'>
      {userList.map((item) => (
        <div
          key={item.id}
          className="flex justify-between w-full py-2 border-b border-b-gray3 cursor-pointer"
          onClick={() => handleItemClick(item.title)}
        >
          <h2 className="text-xl font-medium">{item.title}</h2>
          <IoIosArrowForward className="text-2xl" />
        </div>
      ))}
    </div>
  );
};

export default UserOrderList;
