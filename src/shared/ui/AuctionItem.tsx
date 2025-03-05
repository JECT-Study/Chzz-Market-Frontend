import { ReactNode } from 'react';
import { LikeCount } from './LikeCount';
import { ParticipantCount } from './ParticipantCount';
import { Price } from './Price';
import { TimeLabel } from './TimeLabel';

interface AuctionItemProps {
  label: string;
  axis: 'row' | 'column';
  children: ReactNode;
}

export const AuctionItem = ({ label, axis, children }: AuctionItemProps) => {
  const axisStyle = axis === 'column' && 'flex-col';
  const height = axis === 'column' && 'min-h-[16rem] h-[16rem]';

  return (
    <figure
      aria-label={label}
      className={`flex ${height} gap-3 w-full ${axisStyle}`}
    >
      {children}
    </figure>
  );
};

interface ImageProps {
  src: string;
  time?: number;
  loading?: 'lazy' | 'eager';
  priority?: 'high' | 'low';
}

const Image = ({ src, time = undefined, loading, priority }: ImageProps) => {
  return (
    <div className="relative w-full min-h-[7.5rem] max-h-[9rem] h-full">
      <img
        src={`${src}?h=228`}
        alt="이미지"
        className="object-contain w-full h-full rounded"
        {...{ fetchpriority: priority }}
        loading={loading} />
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
    <figcaption className="flex flex-col w-full gap-[.125rem] py-2">
      <h3 aria-label="이름" className="text-body1Bold text-gray1">
        {name}
      </h3>
      <Price title="시작가" price={price} />
      {kind !== 'preAuction' ? (
        <ParticipantCount count={count} />
      ) : (
        <LikeCount count={count} />
      )}
    </figcaption>
  );
};

const Button = ({ children }: { children: ReactNode }) => {
  return <div onClick={(e) => e.stopPropagation()}>{children}</div>;
};

AuctionItem.Image = Image;
AuctionItem.Main = Main;
AuctionItem.Button = Button;
