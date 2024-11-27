import { useAuth } from '@/features/auth/hooks';
import { IoIosArrowForward } from 'react-icons/io';
import { useDeleteUsers } from '../model/useDeleteUsers';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Confirm, Modal, removeToken } from '@/shared';

const userList = [
  {
    id: 1,
    title: '로그아웃',
  },
  {
    id: 2,
    title: '회원탈퇴',
  },
];

export const UserOrderList = () => {
  const { handleLogout } = useAuth();
  const { deleteUser } = useDeleteUsers();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (title: string) => {
    if (title === '로그아웃') {
      handleLogout();
    } else if (title === '회원탈퇴') {
      setIsModalOpen(true);
    }
  };

  const handleDeleteUser = () => {
    deleteUser(undefined, {
      onSuccess: () => {
        removeToken();
        setIsModalOpen(false);
        navigate('/');
      },
    });
  };

  return (
    <div className="web:mt-10">
      {userList.map((item) => (
        <div
          key={item.id}
          className="flex justify-between w-full py-3 border-b cursor-pointer border-b-gray3"
          onClick={() => handleItemClick(item.title)}
        >
          <h2 className="text-heading3 web:text-heading2 font-medium">{item.title}</h2>
          <IoIosArrowForward className="text-2xl" />
        </div>
      ))}

      {isModalOpen && (
        <Modal>
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <Confirm 
              type="deleteUser"
              onCloseModal={() => setIsModalOpen(false)}
            >
              <Button
                type="button"
                color="cheeseYellow"
                className="w-full"
                onClick={handleDeleteUser}
              >
                회원 탈퇴
              </Button>
            </Confirm>
          </div>
        </Modal>
      )}
    </div>
  );
};
