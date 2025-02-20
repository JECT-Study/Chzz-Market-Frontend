import { EMPTY_MESSAGE } from '@/shared/constants/emptyMessage';
import EmptyIcon from '@/shared/assets/icons/empty.svg';
import { ReactNode } from 'react';

const EmptyFallback = ({ type }: { type: string }) => {
  return (
    <div
      aria-label="empty message"
      className="flex flex-col items-center justify-center w-full h-full gap-2 rounded"
    >
      <img src={EmptyIcon} alt="emptyIcon" className="size-10" />
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
