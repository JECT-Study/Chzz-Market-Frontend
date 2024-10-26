import Button from "../common/Button";
import Confirm from "../common/Confirm";
import DeleteIcon from '@/assets/icons/modal_cancel.svg';
import EditIcon from '@/assets/icons/modal_edit.svg';
import Modal from "../common/Modal";

interface DetailsOptionProps {
  clickEdit: () => void
  confirmDelete: () => void
  onCloseModal?: () => void
  isPending: boolean
}

const DetailsOption = ({ clickEdit, confirmDelete, isPending }: DetailsOptionProps) => {
  return (
    <div onClick={(e) => e.stopPropagation()} className='absolute flex flex-col z-50 bg-white rounded-lg w-[10rem] top-12 right-8 sm:text-body1 text-body2'>
      <button onClick={clickEdit} className='flex items-center justify-center gap-3 px-2 py-4 transition-colors hover:bg-black/10'>
        <span>수정하기</span>
        <img src={EditIcon} alt="수정 아이콘" className='size-5 mb-[2px]' />
      </button>
      <Modal>
        <Modal.Open name='deletePreAuction'>
          <button className='flex items-center justify-center gap-3 px-2 py-4 transition-colors hover:bg-black/10 text-redNotice'>
            <span>삭제하기</span>
            <img src={DeleteIcon} alt="삭제 아이콘" className='size-5 mb-[2px]' />
          </button>
        </Modal.Open>
        <Modal.Window name='deletePreAuction'>
          <Confirm type='deletePreAuction'>
            <Button disabled={isPending} loading={isPending} type='button' color='cheeseYellow' className='w-full' onClick={confirmDelete}>
              삭제
            </Button>
          </Confirm>
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default DetailsOption;
