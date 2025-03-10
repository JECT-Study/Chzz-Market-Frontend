import { ReactNode } from 'react';
import { EMPTY_MESSAGE } from '../../constants/emptyMessage';
import { Icon } from '../Icon';

const EmptyFallback = ({ type }: { type: string }) => {
  return (
    <div
      aria-label="empty message"
      className="flex flex-col items-center justify-center w-full h-full gap-2 rounded"
    >
      <Icon name='empty' style='size-10' ariaLabel='empty_icon' />
      <p className="md:text-heading3 text-body1 text-gray2">
        {EMPTY_MESSAGE[type]}
      </p>
    </div>
  );
};

interface EmptyBoundaryProps {
  type: string;
  length: number;
  children: ReactNode;
}

export const EmptyBoundary = ({
  type,
  length,
  children
}: EmptyBoundaryProps) => {
  return length === 0 ? <EmptyFallback type={type} /> : children;
};
