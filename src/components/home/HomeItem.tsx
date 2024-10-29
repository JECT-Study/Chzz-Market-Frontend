import type { IAuctionItem, IPreAuctionItem } from '@/@types/AuctionItem';

import ROUTES from '@/constants/routes';
import { truncateText } from '@/utils/truncateText';
import { useNavigate } from 'react-router-dom';
import LikeCount from '../common/atomic/LikeCount';
import ParticipantCount from '../common/atomic/ParticipantCount';
import Price from '../common/atomic/Price';
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
    kind === 'preAuction'
      ? ROUTES.getPreAuctionItemRoute((item as IPreAuctionItem).productId)
      : ROUTES.getAuctionItemRoute((item as IAuctionItem).auctionId)
  );
  const name = truncateText(productName);

  return (
    <CarouselItem>
      <figure className='flex w-[9.25rem] h-[12.5rem] flex-col gap-2 border rounded cursor-pointer text-body2' aria-label={kind} onClick={handleClick}>
        <div className='relative w-full h-[7.5rem]'>
          <img src={imageUrl} alt={`${kind}_이미지`} className='object-cover w-full h-full rounded-t' />
          {kind !== 'preAuction' && <TimeLabel time={(item as IAuctionItem).timeRemaining} />}
        </div>
        <figcaption className='flex flex-col gap-1 px-1'>
          <div aria-label={`${kind}_이름`} className='text-gray1 text-body2'>
            {name}
          </div>
          <div>
            <Price title='시작가' price={minPrice} />
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
