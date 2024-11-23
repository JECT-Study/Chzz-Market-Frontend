import { EMPTY_MESSAGE } from "@/shared";
import EmptyIcon from '@/shared/assets/icons/empty.svg';
import { ReactNode } from "react";

const EmptyFallback = ({ type }: { type: string }) => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-2 rounded min-h-28'>
      <img src={EmptyIcon} alt='emptyIcon' className='size-7' />
      <p className='md:text-body1 text-caption text-gray2'>{EMPTY_MESSAGE[type]}</p>
    </div>
  )
};

interface EmptyBoundaryProps {
  type: string;
  length: number;
  children: ReactNode
}

export const EmptyBoundary = ({ type, length, children }: EmptyBoundaryProps) => {
  return length === 0 ? <EmptyFallback type={type} /> : children
}