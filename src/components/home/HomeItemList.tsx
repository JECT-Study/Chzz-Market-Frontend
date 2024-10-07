import { IAuctionItem, IPreAuctionItem } from "AuctionItem";
import CustomCarousel from "../common/CustomCarousel";
import EmptyBoundary from "../common/EmptyBoundary";
import HomeItem from "./HomeItem";

interface HomeItemListProps<T extends 'preAuction' | 'auction'> {
  name: string
  data: T extends 'preAuction' ? IPreAuctionItem[] : IAuctionItem[]
}

const HomeItemList = <T extends 'preAuction' | 'auction'>({ name, data }: HomeItemListProps<T>) => {
  const kind = name === '사전 등록 경매' ? 'preAuction' : 'auction';

  return (
    <section className='flex flex-col w-full gap-4'>
      <label className='text-lg font-semibold'>{name}</label>
      <div className='flex gap-4'>
        <EmptyBoundary dataLength={data.length} type={name}>
          <CustomCarousel length={data.length}>
            {data.map((el) => (
              <HomeItem<T> key={kind === 'preAuction' ? (el as IPreAuctionItem).productId : (el as IAuctionItem).auctionId} kind={kind as T} item={el as (T extends 'preAuction' ? IPreAuctionItem : IAuctionItem)} />
            ))}
          </CustomCarousel>
        </EmptyBoundary>
      </div>
    </section>
  );
};

export default HomeItemList;
