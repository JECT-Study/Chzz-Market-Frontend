import CategoryList from '@/components/home/CategoryList';
import HomeItemList from '@/components/home/HomeItemList';
import HomeAuctionItem from '@/components/home/HomeAuctionItem';
import HomeRegisterBtn from '@/components/home/HomeRegisterBtn';
import { useEffect } from 'react';

import { useNavigationContext } from '@/components/navigation/NavigationContext';
import { useScrollDetection } from '@/hooks/useScrollDetection';
import type { PreRegisterAuction, RegisterAuction } from 'Auction';
import { useGetHomeAuctions, useRefreshTokenOnSuccess } from '@/components/home/queries';

const Home = () => {
  const { isScrolled, elementRef } = useScrollDetection(0);
  const { handleNavigationState } = useNavigationContext();
  useRefreshTokenOnSuccess();

  const { bestAuctions, imminentAuctions, preRegisterAuctions } =
    useGetHomeAuctions();

  useEffect(() => {
    handleNavigationState({ title: '치즈 마켓', active: 'home' });
  }, [handleNavigationState]);

  return (
    <div
      ref={elementRef}
      role="main"
      aria-label="main_area"
      className="relative flex flex-col w-full gap-6 overflow-y-scroll"
    >
      <HomeItemList name="베스트 경매">
        {bestAuctions.map((auction: RegisterAuction) => (
          <HomeAuctionItem key={auction.id} kind="register" auction={auction} />
        ))}
      </HomeItemList>
      <HomeItemList name="종료 임박 경매">
        {imminentAuctions.map((auction: RegisterAuction) => (
          <HomeAuctionItem key={auction.id} kind="register" auction={auction} />
        ))}
      </HomeItemList>
      <HomeItemList name="카테고리">
        <CategoryList />
      </HomeItemList>
      <HomeItemList name="사전 등록 경매">
        {preRegisterAuctions.map((auction: PreRegisterAuction) => (
          <HomeAuctionItem
            key={auction.id}
            kind="pre-register"
            auction={auction}
          />
        ))}
      </HomeItemList>
      <HomeRegisterBtn isScrolled={isScrolled} />
    </div>
  );
};

export default Home;
