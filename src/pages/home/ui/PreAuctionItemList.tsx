import { ROUTES } from '@/shared/constants/routes';

import { AuctionItem } from '@/shared/ui/AuctionItem';
import { CustomCarousel } from '@/shared/ui/CustomCarousel';
import { EmptyBoundary } from '@/shared/ui/boundary/EmptyBoundary';
import { CarouselItem } from '@/shared/ui/carousel';
import { useNavigate } from 'react-router';
import { useGetPreAuctions } from '../model/useGetPreAuctions';

const PreAuctionItemList = () => {
  const { preAuctions } = useGetPreAuctions();
  const navigate = useNavigate();
  const handleClick = (id: number) =>
    navigate(ROUTES.PRE_AUCTION.getItemRoute(id));

  return (
    <EmptyBoundary type="preAuction" length={preAuctions.length}>
      <CustomCarousel length={preAuctions.length}>
        {preAuctions.map((el, idx) => (
          <CarouselItem
            key={el.auctionId}
            onClick={() => handleClick(el.auctionId)}
            className="cursor-pointer web:basis-1/3 basis-1/2"
          >
            <AuctionItem label="preAuction" axis="column">
              <AuctionItem.Image
                src={el.imageUrl}
                loading={idx < 3 ? 'eager' : 'lazy'}
                priority={idx < 3 ? 'high' : 'low'}
              />
              <AuctionItem.Main
                kind="preAuction"
                name={el.auctionName}
                price={el.minPrice}
                count={el.likeCount}
              />
            </AuctionItem>
          </CarouselItem>
        ))}
      </CustomCarousel>
    </EmptyBoundary>
  );
};

export default PreAuctionItemList;
