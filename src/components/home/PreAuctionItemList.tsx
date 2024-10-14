import CustomCarousel from "../common/CustomCarousel";
import EmptyBoundary from "../common/boundary/EmptyBoundary";
import HomeItem from "./HomeItem";
import { useGetPreAuctions } from "./queries";

const PreAuctionItemList = () => {
  const { preAuctions } = useGetPreAuctions()
  const length = preAuctions.length

  return (
    <EmptyBoundary length={length} name="preAuction">
      <CustomCarousel length={length}>
        {preAuctions.map((el) => (
          <HomeItem<'preAuction'> item={el} key={el.productId} kind="preAuction" />
        ))}
      </CustomCarousel>
    </EmptyBoundary>
  );
}

export default PreAuctionItemList;
