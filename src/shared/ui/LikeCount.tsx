import PriceIcon from '@/shared/assets/icons/price.svg';

export const LikeCount = ({ count }: { count: number }) => {
  return (
    <div
      aria-label="좋아요"
      className="flex items-center text-xs web:text-body2 text-gray2"
    >
      <img src={PriceIcon} alt="좋아요" />
      <span className='overflow-hidden whitespace-nowrap pt-[2px]'>
        좋아요
        <span className="ml-1 text-xs text-black web:text-body2Bold">{count} 명</span>
      </span>
    </div>
  );
};