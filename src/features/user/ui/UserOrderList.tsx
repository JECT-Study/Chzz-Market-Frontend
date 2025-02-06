import { Button, Confirm, Modal, removeToken } from '@/shared';

import { useAuth } from '@/features/auth/hooks';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router';
import { useDeleteUsers } from '../model/useDeleteUsers';

export const UserOrderList = () => {
  const { handleLogout } = useAuth();
  const { deleteUser } = useDeleteUsers();
  const navigate = useNavigate();

  const handleDeleteUser = () => {
    deleteUser(undefined, {
      onSuccess: () => {
        removeToken();
        navigate('/');
      }
    });
  };

  return (
    <div className="web:mt-10">
      <div
        className="flex justify-between w-full py-3 border-b cursor-pointer border-b-gray3"
        onClick={handleLogout}
      >
        <h2 className="text-heading3 web:text-heading2 font-medium">
          로그아웃
        </h2>
        <IoIosArrowForward className="text-2xl" />
      </div>
      <Modal>
        <Modal.Open name="deleteUser">
          <div className="flex justify-between w-full py-3 border-b cursor-pointer border-b-gray3">
            <h2 className="text-heading3 web:text-heading2 font-medium">
              회원탈퇴
            </h2>
            <IoIosArrowForward className="text-2xl" />
          </div>
        </Modal.Open>
        <Modal.Window name="deleteUser">
          <Confirm type="deleteUser">
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
      </Modal>
    </div>
  );
};
