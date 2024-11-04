import EmptyIcon from '@/shared/assets/icons/empty.svg';
import { EMPTY_MESSAGE } from '@/shared/constants/index';

export const EmptyFallback = ({ emptyName }: { emptyName: string }) => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-2 rounded min-h-28'>
      <img src={EmptyIcon} alt='emptyIcon' className='size-7' />
      <p className='md:text-body1 text-caption text-gray2'>{EMPTY_MESSAGE[emptyName]}</p>
    </div>
  )
};