import type { IAuctionItem, IPreAuctionItem } from '@/@types/AuctionItem';

import AuctionItem from '@/entities/auction/ui/AuctionItem';
import { ROUTES } from '@/shared/constants/routes';
import { truncateText } from '@/shared/utils/truncateText';
import { useNavigate } from 'react-router-dom';
import { CarouselItem } from '../../shared/shadcn/ui/carousel';

interface HomeItemProps<T extends 'preAuction' | 'auction'> {
  kind: string
  item: T extends 'preAuction' ? IPreAuctionItem : IAuctionItem
}

const HomeItem = <T extends 'preAuction' | 'auction'>({ kind, item }: HomeItemProps<T>) => {
  const navigate = useNavigate();
  const { minPrice, productName, imageUrl } = item
  const handleClick = () => navigate(
    kind === 'preAuction'
      ? ROUTES.PRE_AUCTION.getItemRoute((item as IPreAuctionItem).productId)
      : ROUTES.AUCTION.getItemRoute((item as IAuctionItem).auctionId)
  );
  const name = truncateText(productName);

  return (
    <CarouselItem onClick={handleClick} className='cursor-pointer web:basis-1/3 basis-1/2'>
      <AuctionItem label='kind' axis='column'>
        <AuctionItem.Image src={imageUrl} time={(item as IAuctionItem).timeRemaining} />
        <AuctionItem.Main kind={kind} name={name} price={minPrice} count={kind !== 'preAuction' ? (item as IAuctionItem).participantCount : (item as IPreAuctionItem).likeCount} />
      </AuctionItem>
    </CarouselItem>
  );
};

export default HomeItem;
