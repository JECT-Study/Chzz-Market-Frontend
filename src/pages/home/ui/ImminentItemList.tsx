import { CustomCarousel, ROUTES } from "@/shared";

import AuctionItem from "@/entities/auction/ui/AuctionItem";
import { CarouselItem } from "@/shared/shadcn/ui/carousel";
import { useNavigate } from "react-router-dom";
import { useGetImminentAuctions } from "../model";

const ImminentItemList = () => {
  const { imminentAuctions } = useGetImminentAuctions()
  const navigate = useNavigate();
  const handleClick = (id: number) => navigate(ROUTES.AUCTION.getItemRoute(id))

  return (
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
  );
}

export default ImminentItemList;
