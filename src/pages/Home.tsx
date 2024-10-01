import type { PreRegisterAuction, RegisterAuction } from 'Auction';

import CategoryList from '@/components/home/CategoryList';
import EmptyBoundary from '@/components/common/EmptyBoundary';
import HomeAuctionItem from '@/components/home/HomeAuctionItem';
import HomeItemList from '@/components/home/HomeItemList';
import HomeRegisterBtn from '@/components/home/HomeRegisterBtn';
import { useGetHomeAuctions } from '@/components/home/queries';
import { useScrollDetection } from '@/hooks/useScrollDetection';

const Home = () => {
  const { isScrolled, elementRef } = useScrollDetection(0);
  const { bestAuctions, imminentAuctions, preRegisterAuctions } = useGetHomeAuctions();

  return (
    <div ref={elementRef} role='main' aria-label='main_area' className='relative flex flex-col justify-between w-full h-full gap-6 overflow-y-scroll'>
      <div className='flex flex-col gap-10'>
        <HomeItemList name='베스트 경매'>
          <EmptyBoundary dataLength={bestAuctions.length} type='best'>
            {bestAuctions.map((auction: RegisterAuction) => (
              <HomeAuctionItem key={auction.id} kind='register' auction={auction} />
            ))}
          </EmptyBoundary>
        </HomeItemList>
        <HomeItemList name='종료 임박 경매'>
          <EmptyBoundary dataLength={imminentAuctions.length} type='imminent'>
            {imminentAuctions.map((auction: RegisterAuction) => (
              <HomeAuctionItem key={auction.id} kind='register' auction={auction} />
            ))}
          </EmptyBoundary>
        </HomeItemList>
        <HomeItemList name='카테고리'>
          <CategoryList />
        </HomeItemList>
        <HomeItemList name='사전 등록 경매'>
          <EmptyBoundary dataLength={preRegisterAuctions.length} type='preRegisterAuction'>
            {preRegisterAuctions.map((auction: PreRegisterAuction) => (
              <HomeAuctionItem key={auction.id} kind='pre-register' auction={auction} />
            ))}
          </EmptyBoundary>
        </HomeItemList>
      </div>
      <HomeRegisterBtn isScrolled={isScrolled} />
    </div>
  );
};

export default Home;
