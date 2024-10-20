import EmptyIcon from '@/assets/icons/empty.svg';
import { EMPTY_MESSAGE } from '@/constants/emptyMessage';
import { ReactNode } from 'react';

const EmptyFallback = ({ name }: { name: string }) => {
  return <div className='flex flex-col items-center justify-center w-full h-full gap-2 rounded min-h-28'>
    <img src={EmptyIcon} alt='emptyIcon' className='size-7' />
    <p className='md:text-body1 text-caption text-gray2'>{EMPTY_MESSAGE[name]}</p>
  </div>;
};

interface EmptyBoundaryProps {
  length: number;
  name: string;
  children: ReactNode;
}

const EmptyBoundary = ({ length, name, children }: EmptyBoundaryProps) => {
  if (length === 0) return <EmptyFallback name={name} />;

  return children;
};

export default EmptyBoundary;
