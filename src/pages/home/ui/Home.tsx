import BestItemList from '@/components/home/BestItemList';
import CategoryList from '@/components/home/CategoryList';
import HomeItemField from '@/components/home/HomeItemField';
import HomeRegisterBtn from '@/components/home/HomeRegisterBtn';
import ImminentItemList from '@/components/home/ImminentItemList';
import PreAuctionItemList from '@/components/home/PreAuctionItemList';
import { useScrollDetection } from '@/hooks/useScrollDetection';
import { LocalAPIAsyncBoundary } from '@/shared';

export const Home = () => {
  const { isScrolled, elementRef } = useScrollDetection(0);

  return (
    <div ref={elementRef} role='main' aria-label='main_area' className='relative flex flex-col justify-between w-full h-full gap-6 overflow-y-scroll'>
      <div className='flex flex-col gap-10'>
        <HomeItemField name='베스트 경매'>
          <LocalAPIAsyncBoundary height={250}>
            <BestItemList />
          </LocalAPIAsyncBoundary>
        </HomeItemField>
        <HomeItemField name='종료 임박 경매'>
          <LocalAPIAsyncBoundary height={250}>
            <ImminentItemList />
          </LocalAPIAsyncBoundary>
        </HomeItemField>
        <CategoryList />
        <HomeItemField name='사전 경매'>
          <LocalAPIAsyncBoundary height={250}>
            <PreAuctionItemList />
          </LocalAPIAsyncBoundary>
        </HomeItemField>
      </div>
      <HomeRegisterBtn isScrolled={isScrolled} />
    </div>
  );
};