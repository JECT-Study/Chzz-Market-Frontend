import PriceIcon from '@/assets/icons/price.svg';

const LikeCount = ({ count }: { count: number }) => {
  return (
    <div
      aria-label="좋아요"
      className="flex items-center text-body2 text-gray2"
    >
      <img src={PriceIcon} alt="좋아요" />
      <span>
        {`좋아요 `}
        <span className="text-black text-body2Bold">{count}명</span>
      </span>
    </div>
  );
};

export default LikeCount;
