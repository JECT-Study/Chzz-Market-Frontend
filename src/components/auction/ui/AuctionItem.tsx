import { LikeCount, ParticipantCount, Price, TimeLabel } from '@/shared/ui';

import { ReactNode } from 'react';

interface AuctionItemProps {
  label: string;
  axis: 'row' | 'column';
  children: ReactNode;
}

const AuctionItem = ({ label, axis, children }: AuctionItemProps) => {
  const axisStyle = axis === 'column' && 'flex-col';

  return (
    <figure aria-label={label} className={`flex min-h-[16rem] h-[16rem] w-full ${axisStyle}`}>
      {children}
    </figure>
  );
};

const Image = ({ src, time = undefined }: { src: string; time?: number }) => {
  return (
    <div className='relative border rounded w-full min-h-[7.5rem] max-h-[9rem] h-full'>
      <img src={src} alt='이미지' className='object-cover w-full h-full rounded' />
      {time !== undefined && <TimeLabel time={time} />}
    </div>
  );
};

interface MainProps {
  kind: string;
  name: string;
  price: number;
  count: number;
}

const Main = ({ kind, name, price, count }: MainProps) => {
  return (
    <figcaption className='flex flex-col gap-[.125rem] py-2'>
      <h3 aria-label='이름' className='text-body2 text-gray1'>
        {name}
      </h3>
      <Price title='시작가' price={price} />
      {kind === 'register' ? <ParticipantCount count={count} /> : <LikeCount count={count} />}
    </figcaption>
  );
};

const Button = ({ children }: { children: ReactNode }) => {
  return <div onClick={(e) => e.stopPropagation()}>{children}</div>;
};

AuctionItem.Image = Image;
AuctionItem.Main = Main;
AuctionItem.Button = Button;

export default AuctionItem;
