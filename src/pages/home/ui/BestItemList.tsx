import { AuctionItem, CarouselItem, CustomCarousel, EmptyBoundary, ROUTES } from "@/shared";

import { useNavigate } from "react-router-dom";
import { useGetBestAuctions } from "../model";

const BestItemList = () => {
  const navigate = useNavigate();
  const { bestAuctions } = useGetBestAuctions()
  const handleClick = (id: number) => navigate(ROUTES.AUCTION.getItemRoute(id))

  return (
    <EmptyBoundary type="best" length={bestAuctions.length}>
      <CustomCarousel length={bestAuctions.length}>
        {bestAuctions.map((el) => (
          <CarouselItem key={el.auctionId} onClick={() => handleClick(el.auctionId)} className='cursor-pointer web:basis-1/3 basis-1/2'>
            <AuctionItem label='best' axis='column'>
              <AuctionItem.Image src={el.imageUrl} time={el.timeRemaining} />
              <AuctionItem.Main kind='best' name={el.productName} price={el.minPrice} count={el.participantCount} />
            </AuctionItem>
          </CarouselItem>
        ))}
      </CustomCarousel>
    </EmptyBoundary>
  );
}

export default BestItemList;
