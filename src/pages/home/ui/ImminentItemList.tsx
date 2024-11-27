import { AuctionItem, CarouselItem, CustomCarousel, EmptyBoundary, ROUTES } from "@/shared";

import { useNavigate } from "react-router-dom";
import { useGetImminentAuctions } from "../model";

const ImminentItemList = () => {
  const { imminentAuctions } = useGetImminentAuctions()
  const navigate = useNavigate();
  const handleClick = (id: number) => navigate(ROUTES.AUCTION.getItemRoute(id))

  return (
    <EmptyBoundary type="imminent" length={imminentAuctions.length}>
      <CustomCarousel length={imminentAuctions.length}>
        {imminentAuctions.map((el) => (
          <CarouselItem key={el.auctionId} onClick={() => handleClick(el.auctionId)} className='cursor-pointer web:basis-1/3 basis-1/2'>
            <AuctionItem label='imminent' axis='column'>
              <AuctionItem.Image src={el.imageUrl} time={el.timeRemaining} />
              <AuctionItem.Main kind='imminent' name={el.productName} price={el.minPrice} count={el.participantCount} />
            </AuctionItem>
          </CarouselItem>
        ))}
      </CustomCarousel>
    </EmptyBoundary>
  );
}

export default ImminentItemList;
