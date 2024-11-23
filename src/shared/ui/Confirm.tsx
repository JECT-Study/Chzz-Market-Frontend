import { CONFIRM_MESSAGE } from "@/shared/constants/confirmMessage";
import { ReactNode } from "react";
import { Button } from "./Button";

interface ConfirmProps {
  type: string
  children: ReactNode
  onCloseModal?: () => void
}

export const Confirm = ({ type, children, onCloseModal }: ConfirmProps) => {
  const { title, description } = CONFIRM_MESSAGE[type]

  return (
    <div onClick={(e) => e.stopPropagation()} className='min-w-[17rem] min-h-[13rem] w-[48%] max-w-[23rem] flex items-center gap-3 flex-col justify-between p-8 bg-white rounded-lg web:text-body1 text-body2'>
      <div className="flex flex-col w-full gap-2">
        <h3 className="web:text-heading3 text-body2Bold">{title}</h3>
        <p className='web:text-body2 text-caption'>{description}</p>
      </div>
      <div className="flex justify-between w-full gap-3">
        <Button type='button' onClick={onCloseModal} className='w-full'>
          닫기
        </Button>
        {children}
      </div>
    </div>
  );
}