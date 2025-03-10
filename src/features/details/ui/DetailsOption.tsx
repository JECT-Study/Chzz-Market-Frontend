import { Button } from '@/shared/ui/Button';
import { Confirm } from '@/shared/ui/Confirm';
import { Icon } from '@/shared/ui/Icon';
import { Modal } from '@/shared/ui/Modal';

interface DetailsOptionProps {
  clickEdit: () => void;
  confirmDelete: () => void;
  onCloseModal?: () => void;
  isPending: boolean;
}

export const DetailsOption = ({
  clickEdit,
  confirmDelete,
  isPending
}: DetailsOptionProps) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute flex flex-col z-50 bg-white rounded-lg w-[10rem] top-12 right-8 web:text-body1 text-body2"
    >
      <button
        aria-label="수정하기"
        onClick={clickEdit}
        className="flex items-center justify-center gap-3 px-2 py-4 transition-colors hover:bg-black/10"
      >
        <span>수정하기</span>
        <Icon name="modal_edit" style='size-5 mb-[2px]' ariaLabel='수정 아이콘' />
      </button>
      <Modal>
        <Modal.Open name="deletePreAuction">
          <button
            aria-label="삭제하기 확인"
            className="flex items-center justify-center gap-3 px-2 py-4 transition-colors hover:bg-black/10 text-redNotice"
          >
            <span>삭제하기</span>
            <Icon name="modal_cancel" style='size-5 mb-[2px]' ariaLabel='삭제 아이콘' />
          </button>
        </Modal.Open>
        <Modal.Window name="deletePreAuction">
          <Confirm type="deletePreAuction">
            <Button
              ariaLabel="삭제하기"
              disabled={isPending}
              loading={isPending}
              type="button"
              color="cheeseYellow"
              className="w-full"
              onClick={confirmDelete}
            >
              삭제
            </Button>
          </Confirm>
        </Modal.Window>
      </Modal>
    </div>
  );
};
