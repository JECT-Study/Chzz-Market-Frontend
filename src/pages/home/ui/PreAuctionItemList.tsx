import { AuctionItem, CustomCarousel, ROUTES } from "@/shared";

import { CarouselItem } from "@/shared/shadcn/ui/carousel";
import { useNavigate } from "react-router-dom";
import { useGetPreAuctions } from "../model";

const PreAuctionItemList = () => {
  const { preAuctions } = useGetPreAuctions()
  const navigate = useNavigate();
  const handleClick = (id: number) => navigate(ROUTES.PRE_AUCTION.getItemRoute(id))

  return (
    <CustomCarousel length={preAuctions.length}>
      {preAuctions.map((el) => (
        <CarouselItem key={el.productId} onClick={() => handleClick(el.productId)} className='cursor-pointer web:basis-1/3 basis-1/2'>
          <AuctionItem label='imminent' axis='column'>
            <AuctionItem.Image src={el.imageUrl} />
            <AuctionItem.Main kind='imminent' name={el.productName} price={el.minPrice} count={el.likeCount} />
          </AuctionItem>
        </CarouselItem>
      ))}
    </CustomCarousel>
  );
}

export default PreAuctionItemList;
