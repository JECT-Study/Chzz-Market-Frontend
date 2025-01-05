import { useScrollDetection } from '../lib';
import BestItemList from './BestItemList';
import CategoryList from './CategoryList';
import HomeItemField from './HomeItemField';
import { HomeRegisterBtn } from './HomeRegisterBtn';
import { HomeSearchBar } from './HomeSearchBar';
import ImminentItemList from './ImminentItemList';
import PreAuctionItemList from './PreAuctionItemList';

export const Home = () => {
  const { isScrolled, elementRef } = useScrollDetection(0);

  return (
    <div ref={elementRef} role='main' aria-label='main_area' className='relative flex flex-col justify-between w-full h-full gap-6 overflow-y-scroll'>
      <HomeSearchBar />
      <div className='flex flex-col gap-10'>
        <HomeItemField name='베스트 경매'>
          <BestItemList />
        </HomeItemField>
        <HomeItemField name='종료 임박 경매'>
          <ImminentItemList />
        </HomeItemField>
        <CategoryList />
        <HomeItemField name='사전 경매'>
          <PreAuctionItemList />
        </HomeItemField>
      </div>
      <HomeRegisterBtn isScrolled={isScrolled} />
    </div>
  );
};