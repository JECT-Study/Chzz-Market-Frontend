import { IAuctionRegisteredItem, IPreAuctionRegisteredItem } from 'AuctionItem';
import { useCallback, useEffect, useRef, useState } from 'react';

import EmptyBoundary from '@/components/common/boundary/EmptyBoundary';
import OngoingMyRegister from '@/components/user/OngoingMyRegister';
import PreEnrollMyRegister from '@/components/user/PreEnrollMyRegister';
import UserOrderTab from '@/components/user/UserOrderTab';
import useMyAuctionList from '@/hooks/useMyAuctionList';
import { useLocation } from 'react-router-dom';

const UserRegisteredList = () => {
  const location = useLocation();
  const sortType = location.state?.sortType;
  const [activeTab, setActiveTab] = useState(sortType === true ? true : false);
  const loader = useRef(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const { ongoingData, enrollData, fetchNextOngoingPage, fetchNextEnrollPage, hasNextOngoingPage, hasNextEnrollPage, refetchOngoingData, refetchEnrollData } =
    useMyAuctionList(activeTab);

  const ongoingItems = ongoingData?.pages[0]?.items || [];
  const enrollItems = enrollData?.pages[0]?.items || [];

  const handleObserver = useCallback(
    (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting) {
        if (hasNextOngoingPage) {
          fetchNextOngoingPage();
        }
        if (hasNextEnrollPage) {
          fetchNextEnrollPage();
        }
      }
    },
    [fetchNextOngoingPage, fetchNextEnrollPage, hasNextOngoingPage, hasNextEnrollPage]
  );

  useEffect(() => {
    const options = {
      root: mainContainerRef.current,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [fetchNextOngoingPage, hasNextOngoingPage, handleObserver]);

  useEffect(() => {
    if (activeTab === true) {
      refetchOngoingData();
    } else {
      refetchEnrollData();
    }
  }, [activeTab, refetchOngoingData, refetchEnrollData]);

  return (
    <div className='mx-[-32px] my-[-4px] h-full'>
      <UserOrderTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab ? (
        <EmptyBoundary length={ongoingItems.length} name='userAuction'>
          <div className={`grid grid-cols-2 grid-rows-3 gap-4 p-4 h-[calc(100vh-100px)] overflow-y-auto`}>
            {ongoingItems.map((product: IAuctionRegisteredItem) => (
              <OngoingMyRegister product={product} key={product.createdAt} />
            ))}
          </div>
        </EmptyBoundary>
      ) : (
        <EmptyBoundary length={enrollItems.length} name='userPreAuction'>
          <div className={`grid grid-cols-2 grid-rows-3 gap-4 p-4 h-[calc(100vh-100px)] overflow-y-auto`}>
            {enrollItems.map((product: IPreAuctionRegisteredItem) => (
              <PreEnrollMyRegister product={product} key={product.createdAt} />
            ))}
          </div>
        </EmptyBoundary>
      )}
    </div>
  );
};

export default UserRegisteredList;
