import { EMPTY_MESSAGE } from '@/constants/emptyMessage';

const EmptyFallback = ({ type }: { type: string }) => {
  return <div className='flex items-center justify-center w-full h-full md:text-heading1 text-heading3 text-mainCheeseYellow'>{EMPTY_MESSAGE[type]}</div>;
};

export default EmptyFallback;
