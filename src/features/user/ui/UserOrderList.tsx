import { useAuth } from '@/features/auth/hooks';
import { IoIosArrowForward } from 'react-icons/io';
import { useDeleteUsers } from '../model/useDeleteUsers';
import { useNavigate } from 'react-router-dom';
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

  const handleItemClick = (title: string) => {
    if (title === '로그아웃') {
      handleLogout();
    }
  };

  const handleDeleteUser = () => {
    deleteUser(undefined, {
      onSuccess: () => {
        removeToken();
        navigate('/');
      },
    });
  };

  return (
    <Modal>
      <div className="web:mt-10">
        {userList.map((item) =>
          item.title === '회원탈퇴' ? (
            <Modal.Open name="deleteUser" key={item.id}>
              <div
                className="flex justify-between w-full py-3 border-b cursor-pointer border-b-gray3"
              >
                <h2 className="text-heading3 web:text-heading2 font-medium">{item.title}</h2>
                <IoIosArrowForward className="text-2xl" />
              </div>
            </Modal.Open>
          ) : (
            <div
              key={item.id}
              className="flex justify-between w-full py-3 border-b cursor-pointer border-b-gray3"
              onClick={() => handleItemClick(item.title)}
            >
              <h2 className="text-heading3 web:text-heading2 font-medium">{item.title}</h2>
              <IoIosArrowForward className="text-2xl" />
            </div>
          )
        )}

        <Modal.Window name="deleteUser">
          <Confirm 
            type="deleteUser"
            onCloseModal={() => {}}
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
        </Modal.Window>
      </div>
    </Modal>
  );
};
