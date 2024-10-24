import Button from "./Button";
import { CONFIRM_MESSAGE } from "@/constants/confirmMessage";
import { ReactNode } from "react";

interface ConfirmProps {
  type: string
  children: ReactNode
  onCloseModal?: () => void
}

const Confirm = ({ type, children, onCloseModal }: ConfirmProps) => {
  const { title, description } = CONFIRM_MESSAGE[type]

  return (
    <div onClick={(e) => e.stopPropagation()} className='min-w-[17rem] w-2/5 max-w-[23rem] flex items-center justify-center p-8 bg-white rounded-lg sm:text-body1 text-body2'>
      <div className="flex flex-col gap-3">
        <h3 className="sm:text-heading3 text-body2Bold">{title}</h3>
        <p className='sm:text-body2 text-caption'>{description}</p>
        <div className="flex justify-between w-full gap-3 mt-2">
          <Button type='button' onClick={onCloseModal} className='w-full'>
            취소
          </Button>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Confirm;
