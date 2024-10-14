import { EMPTY_MESSAGE } from '@/constants/emptyMessage';
import { ReactNode } from 'react';

const EmptyFallback = ({ name }: { name: string }) => {
  return <div className='flex items-center justify-center w-full h-full md:text-heading2 text-heading3 text-gray2'>{EMPTY_MESSAGE[name]}</div>;
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
