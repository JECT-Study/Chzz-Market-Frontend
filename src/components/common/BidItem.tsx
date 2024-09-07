import type { BidProduct } from 'Product';
import PriceIcon from '@/assets/icons/price.svg';
import UserIcon from '@/assets/icons/user.svg';
import { getTimeColor } from '@/utils/getTimeColor';

const BidItem = ({
  item,
  progress,
}: {
  item: BidProduct;
  progress: boolean;
}) => {
  const { img, timeLeft, name, startPrice, activeUserCount } = item;
  // const remainHour = Math.floor(timeLeft / 3600);
  const timeColor = getTimeColor(timeLeft);
  return (
    <figure
      className="flex gap-3 py-1 text-body1 min-w-[12rem] rounded"
      aria-label="입찰 상품"
    >
      <div className="relative border rounded">
        <img
          src={img}
          alt="이미지"
          className="object-cover w-full h-[13rem] rounded"
        />
        {progress && (
          <div
            aria-label="남은 시간"
            className={`absolute text-body2 bottom-0 w-full pt-1 text-center bg-white opacity-80 ${timeColor} border-b-2`}
          >
            {timeLeft}시간 남음
          </div>
        )}
      </div>
      <figcaption className="flex flex-col gap-1">
        <h3 aria-label="이름" className="text-heading3">
          {name}
        </h3>
        <div
          aria-label="시작 가격"
          className="flex items-center text-body2 text-gray2"
        >
          <img src={PriceIcon} alt="price_icon" />
          <span>
            시작가{' '}
            <span className="text-black text-body2Bold">{startPrice}</span>
          </span>
        </div>
        <div
          aria-label="경매 참여자 수"
          className="flex items-center text-body2 text-gray2"
        >
          <img src={UserIcon} alt="user_icon" />
          <span>
            참여자{' '}
            <span className="text-black text-body2Bold">
              {activeUserCount}명
            </span>
          </span>
        </div>
      </figcaption>
    </figure>
  );
};

export default BidItem;
