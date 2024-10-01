import EmptyFallback from './EmptyFallback';
import { ReactNode } from 'react';

interface EmptyBoundaryProps {
  dataLength: number;
  type: string;
  children: ReactNode;
}

const EmptyBoundary = ({ dataLength, type, children }: EmptyBoundaryProps) => {
  if (dataLength === 0) return <EmptyFallback type={type} />;

  return children;
};

export default EmptyBoundary;
