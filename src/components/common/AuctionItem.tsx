import LikeIcon from '@/assets/icons/like.svg';
import PriceIcon from '@/assets/icons/price.svg';
import { ReactNode } from 'react';
import UserIcon from '@/assets/icons/user.svg';
import { getTimeColor } from '@/utils/getTimeColor';

interface AuctionItemProps {
  label: string;
  axis: 'row' | 'column';
  children: ReactNode;
}

const AuctionItem = ({ label, axis, children }: AuctionItemProps) => {
  const axisStyle = axis === 'column' && 'flex-col';

  return (
    <figure aria-label={label} className={`flex gap-2 ${axisStyle}`}>
      {children}
    </figure>
  );
};

const Image = ({ src, time = undefined }: { src: string; time?: number }) => {
  const color = time && getTimeColor(time);

  return (
    <div className="relative border rounded">
      <img
        src={src}
        alt="이미지"
        className="object-cover w-full h-[13rem] rounded"
      />
      {time && (
        <div
          aria-label="남은 시간"
          className={`absolute text-body2 bottom-0 w-full pt-1 text-center bg-white opacity-80 ${color} border-b-2`}
        >
          {time}시간 남음
        </div>
      )}
    </div>
  );
};

interface MainProps {
  kind: 'register' | 'pre-register';
  name: string;
  startPrice: string;
  count: number;
}

const Main = ({ kind, name, startPrice, count }: MainProps) => {
  const countLabel = kind === 'register' ? '참여자' : '좋아요';
  const icon = kind === 'register' ? UserIcon : LikeIcon;
  return (
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
          시작가 <span className="text-black text-body2Bold">{startPrice}</span>
        </span>
      </div>
      <div
        aria-label={countLabel}
        className="flex items-center text-body2 text-gray2"
      >
        <img src={icon} alt={countLabel} />
        <span>
          {countLabel}{' '}
          <span className="text-black text-body2Bold">{count}명</span>
        </span>
      </div>
    </figcaption>
  );
};

const Button = ({ children }: { children: ReactNode }) => {
  return { children };
};

AuctionItem.Image = Image;
AuctionItem.Main = Main;
AuctionItem.Button = Button;

export default AuctionItem;
