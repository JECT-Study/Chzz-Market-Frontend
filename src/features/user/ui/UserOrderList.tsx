
import { useAuth } from '@/features/auth/hooks';
import { Button } from '@/shared/ui/Button';
import { Confirm } from '@/shared/ui/Confirm';
import { Modal } from '@/shared/ui/Modal';
import { removeToken } from '@/shared/utils/token';
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
        <h2 className="font-medium text-heading3 web:text-heading2">
          로그아웃
        </h2>
        <IoIosArrowForward className="text-2xl" />
      </div>
      <Modal>
        <Modal.Open name="deleteUser">
          <div className="flex justify-between w-full py-3 border-b cursor-pointer border-b-gray3">
            <h2 className="font-medium text-heading3 web:text-heading2">
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
