import { ROUTES } from '@/shared/constants/routes';


import { AuctionItem } from '@/shared/ui/AuctionItem';
import { CustomCarousel } from '@/shared/ui/CustomCarousel';
import { EmptyBoundary } from '@/shared/ui/boundary/EmptyBoundary';
import { CarouselItem } from '@/shared/ui/carousel';
import { useNavigate } from 'react-router';
import { useGetBestAuctions } from '../model';

const BestItemList = () => {
  const navigate = useNavigate();
  const { bestAuctions } = useGetBestAuctions();
  const handleClick = (id: number) => navigate(ROUTES.AUCTION.getItemRoute(id));

  return (
    <EmptyBoundary type="best" length={bestAuctions.length}>
      <CustomCarousel length={bestAuctions.length}>
        {bestAuctions.map((el, idx) => (
          <CarouselItem
            key={el.auctionId}
            onClick={() => handleClick(el.auctionId)}
            className="cursor-pointer web:basis-1/3 basis-1/2"
          >
            <AuctionItem label="best" axis="column">
              <AuctionItem.Image
                src={el.imageUrl}
                time={el.timeRemaining}
                loading={idx < 3 ? 'eager' : 'lazy'}
                priority={idx < 3 ? 'high' : 'low'}
              />
              <AuctionItem.Main
                kind="best"
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

export default BestItemList;
