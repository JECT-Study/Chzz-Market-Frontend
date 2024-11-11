import { useAuth } from '@/features/auth/hooks';
import { ROUTES } from '@/shared/constants/routes';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const userList = [
  {
    id: 1,
    title: '로그아웃',
  },
];

export const UserOrderList = () => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleItemClick = (title: string) => {
    if (title === '내가 등록한 경매 내역') {
      navigate(ROUTES.USER.REGISTERED_LIST);
    } else if (title === '로그아웃') {
      handleLogout();
    }
  };

  return (
    <div className='web:mt-10'>
      {userList.map((item) => (
        <div
          key={item.id}
          className="flex justify-between w-full py-2 border-b cursor-pointer border-b-gray3"
          onClick={() => handleItemClick(item.title)}
        >
          <h2 className="text-heading3 web:text-heading2 font-medium">{item.title}</h2>
          <IoIosArrowForward className="text-2xl" />
        </div>
      ))}
    </div>
  );
};
