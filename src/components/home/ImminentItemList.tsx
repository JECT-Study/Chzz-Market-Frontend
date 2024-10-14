import CustomCarousel from "../common/CustomCarousel";
import EmptyBoundary from "../common/boundary/EmptyBoundary";
import HomeItem from "./HomeItem";
import { useGetImminentAuctions } from "./queries";

const ImminentItemList = () => {
  const { imminentAuctions } = useGetImminentAuctions()
  const length = imminentAuctions.length

  return (
    <EmptyBoundary length={length} name="imminent">
      <CustomCarousel length={length}>
        {imminentAuctions.map((el) => (
          <HomeItem<'auction'> item={el} key={el.auctionId} kind="종료 임박" />
        ))}
      </CustomCarousel>
    </EmptyBoundary>
  );
}

export default ImminentItemList;
