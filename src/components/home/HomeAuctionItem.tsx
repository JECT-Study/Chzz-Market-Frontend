import type { IAuctionItem, IPreAuctionItem } from 'AuctionItem';

import LikeCount from '../common/atomic/LikeCount';
import MinPrice from '../common/atomic/MinPrice';
import ParticipantCount from '../common/atomic/ParticipantCount';
import TimeLabel from '../common/atomic/TimeLabel';
import { truncateText } from '@/utils/truncateText';
import { useNavigate } from 'react-router-dom';

type HomeAuctionItemProps<T> = T extends 'preAuction' ? { kind: 'preAuction'; auction: IPreAuctionItem } : { kind: 'auction'; auction: IAuctionItem };

const HomeAuctionItem = <T extends 'preAuction' | 'auction'>({ kind, auction }: HomeAuctionItemProps<T>) => {
  const navigate = useNavigate();
  const { productName, imageUrl, minPrice } = auction;
  const handleClick = () => navigate(kind === 'auction' ? `/auctions/auction/${auction.auctionId}` : `/auctions/pre-auction/${auction.productId}`);
  const name = truncateText(productName);

  return (
    <figure className='flex flex-col w-[11rem] gap-2 border rounded text-body2 cursor-pointer' aria-label={kind} onClick={handleClick}>
      <div className='relative'>
        <img src={imageUrl} alt={`${kind}_이미지`} className='object-cover w-full h-[10rem] rounded-t' />
        {kind === 'auction' && <TimeLabel time={auction.timeRemaining} />}
      </div>
      <figcaption className='flex flex-col gap-2 p-2'>
        <div aria-label={`${kind}_이름`} className='text-gray1'>
          {name}
        </div>
        <div>
          <MinPrice price={minPrice} />
          {kind === 'auction' ? <ParticipantCount count={auction.participantCount} /> : <LikeCount count={auction.likeCount} />}
        </div>
      </figcaption>
    </figure>
  );
};

export default HomeAuctionItem;
