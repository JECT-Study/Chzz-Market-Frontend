import { ROUTES } from '@/shared';
import { RefObject } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { useScrollDetection } from '../lib';

export const HomeRegisterBtn = ({ containRef }: { containRef: RefObject<HTMLDivElement> }) => {
  const navigate = useNavigate();
  const { isScrolled } = useScrollDetection(0, containRef);

  return (
    <div className="sticky bottom-0 right-0 z-50 flex justify-end w-full cursor-pointer">
      <button
        className={`relative text-center text-white rounded-full bg-cheeseYellow transition-all text-button  duration-500 h-14 p-4 ${isScrolled ? 'w-full' : 'w-14'
          }`}
        onClick={() => navigate(ROUTES.REGISTER)}
      >
        <span
          className={`absolute inset-0  flex justify-center items-center transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
        >
          경매 등록하기
        </span>
        <span
          className={`absolute inset-0 flex justify-center items-center transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}
        >
          <AiOutlinePlus aria-label="plus_icon" className="size-7" />
        </span>
      </button>
    </div>
  );
};
