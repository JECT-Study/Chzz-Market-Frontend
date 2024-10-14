import CustomCarousel from "../common/CustomCarousel";
import EmptyBoundary from "../common/boundary/EmptyBoundary";
import HomeItem from "./HomeItem";
import { useGetBestAuctions } from "./queries";

const BestItemList = () => {
  const { bestAuctions } = useGetBestAuctions()
  const length = bestAuctions.length

  return (
    <EmptyBoundary length={length} name="best">
      <CustomCarousel length={length}>
        {bestAuctions.map((el) => (
          <HomeItem<'auction'> item={el} key={el.auctionId} kind="best" />
        ))}
      </CustomCarousel>
    </EmptyBoundary>
  );
}

export default BestItemList;
