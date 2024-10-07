
import CategoryList from '@/components/home/CategoryList';
import HomeItemList from '@/components/home/HomeItemList';
import HomeRegisterBtn from '@/components/home/HomeRegisterBtn';
import { useGetHomeAuctions } from '@/components/home/queries';
import { useScrollDetection } from '@/hooks/useScrollDetection';

const Home = () => {
  const { isScrolled, elementRef } = useScrollDetection(0);
  const { bestAuctions, imminentAuctions, preAuctions } = useGetHomeAuctions();

  return (
    <div ref={elementRef} role='main' aria-label='main_area' className='relative flex flex-col justify-between w-full h-full gap-6 overflow-y-scroll'>
      <div className='flex flex-col gap-10'>
        <HomeItemList<'auction'> name='베스트 경매' data={bestAuctions} />
        <HomeItemList<'auction'> name='종료 임박 경매' data={imminentAuctions} />
        <CategoryList />
        <HomeItemList<'preAuction'> name='사전 등록 경매' data={preAuctions} />
      </div>
      <HomeRegisterBtn isScrolled={isScrolled} />
    </div>
  );
};

export default Home;
