import type { IAuctionItem, IPreAuctionItem } from 'AuctionItem';

import LikeCount from '../common/atomic/LikeCount';
import MinPrice from '../common/atomic/MinPrice';
import ParticipantCount from '../common/atomic/ParticipantCount';
import TimeLabel from '../common/atomic/TimeLabel';
import { truncateText } from '@/utils/truncateText';
import { useNavigate } from 'react-router-dom';
import ROUTERS from '@/constants/route';
import { CarouselItem } from '../ui/carousel';

type HomeAuctionItemProps<T> = T extends 'preAuction' ? { kind: 'preAuction'; auction: IPreAuctionItem } : { kind: 'auction'; auction: IAuctionItem };

const HomeAuctionItem = <T extends 'preAuction' | 'auction'>({ kind, auction }: HomeAuctionItemProps<T>) => {
  const navigate = useNavigate();
  const { productName, imageUrl, minPrice } = auction;
  const handleClick = () => navigate(kind === 'auction' ? `${ROUTERS.AUCTION.ITEM}/${auction.auctionId}` : `${ROUTERS.PRE_AUCTION.ITEM}/${auction.productId}`);
  const name = truncateText(productName);

  return (
    <CarouselItem className='basis-1/2 md:basis-1/3'>
      <figure className='flex flex-col gap-2 border rounded cursor-pointer text-body2' aria-label={kind} onClick={handleClick}>
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
    </CarouselItem>
  );
};

export default HomeAuctionItem;
