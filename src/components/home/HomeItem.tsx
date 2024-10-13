import type { IAuctionItem, IPreAuctionItem } from 'AuctionItem';

import ROUTERS from '@/constants/route';
import { truncateText } from '@/utils/truncateText';
import { useNavigate } from 'react-router-dom';
import LikeCount from '../common/atomic/LikeCount';
import MinPrice from '../common/atomic/MinPrice';
import ParticipantCount from '../common/atomic/ParticipantCount';
import TimeLabel from '../common/atomic/TimeLabel';
import { CarouselItem } from '../ui/carousel';

interface HomeItemProps<T extends 'preAuction' | 'auction'> {
  kind: string
  item: T extends 'preAuction' ? IPreAuctionItem : IAuctionItem
}

const HomeItem = <T extends 'preAuction' | 'auction'>({ kind, item }: HomeItemProps<T>) => {
  const navigate = useNavigate();
  const { minPrice, productName, imageUrl } = item
  const handleClick = () => navigate(
    kind !== 'preAuction'
      ? `${ROUTERS.AUCTION.ITEM}/${(item as IAuctionItem).auctionId}`
      : `${ROUTERS.PRE_AUCTION.ITEM}/${(item as IPreAuctionItem).productId}`
  );
  const name = truncateText(productName);

  return (
    <CarouselItem className='basis-1/2 md:basis-1/3'>
      <figure className='flex flex-col gap-2 border rounded cursor-pointer text-body2' aria-label={kind} onClick={handleClick}>
        <div className='relative'>
          <img src={imageUrl} alt={`${kind}_이미지`} className='object-cover w-full h-[10rem] rounded-t' />
          {kind !== 'preAuction' && <TimeLabel time={(item as IAuctionItem).timeRemaining} />}
        </div>
        <figcaption className='flex flex-col gap-2 p-2'>
          <div aria-label={`${kind}_이름`} className='text-gray1'>
            {name}
          </div>
          <div>
            <MinPrice price={minPrice} />
            {kind !== 'preAuction'
              ? <ParticipantCount count={(item as IAuctionItem).participantCount} />
              : <LikeCount count={(item as IPreAuctionItem).likeCount} />}
          </div>
        </figcaption>
      </figure>
    </CarouselItem>
  );
};

export default HomeItem;
