import { ROUTES } from '@/shared';

import { AuctionItem } from '@/shared/ui/AuctionItem';
import { CustomCarousel } from '@/shared/ui/CustomCarousel';
import { EmptyBoundary } from '@/shared/ui/boundary/EmptyBoundary';
import { CarouselItem } from '@/shared/ui/carousel';

import { useNavigate } from 'react-router';
import { useGetImminentAuctions } from '../model';

const ImminentItemList = () => {
  const { imminentAuctions } = useGetImminentAuctions();
  const navigate = useNavigate();
  const handleClick = (id: number) => navigate(ROUTES.AUCTION.getItemRoute(id));

  return (
    <EmptyBoundary type="imminent" length={imminentAuctions.length}>
      <CustomCarousel length={imminentAuctions.length}>
        {imminentAuctions.map((el, idx) => (
          <CarouselItem
            key={el.auctionId}
            onClick={() => handleClick(el.auctionId)}
            className="cursor-pointer web:basis-1/3 basis-1/2"
          >
            <AuctionItem label="imminent" axis="column">
              <AuctionItem.Image
                src={el.imageUrl}
                time={el.timeRemaining}
                loading={idx < 3 ? 'eager' : 'lazy'}
                priority={idx < 3 ? 'high' : 'low'}
              />
              <AuctionItem.Main
                kind="imminent"
                name={el.auctionName}
                price={el.minPrice}
                count={el.participantCount}
              />
            </AuctionItem>
          </CarouselItem>
        ))}
      </CustomCarousel>
    </EmptyBoundary>
  );
};

export default ImminentItemList;
