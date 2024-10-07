import { EMPTY_MESSAGE } from '@/constants/emptyMessage';

const EmptyFallback = ({ type }: { type: string }) => {
  return <div className='flex items-center justify-center w-full h-full md:text-heading2 text-heading3 text-gray2'>{EMPTY_MESSAGE[type]}</div>;
};

export default EmptyFallback;
