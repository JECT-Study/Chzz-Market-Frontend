import { IAuctionEndRegisteredItem, IAuctionOngoingRegisteredItem } from '@/@types/AuctionItem';
import { useCallback, useEffect, useRef, useState } from 'react';

import EndMyRegister from '@/components/user/EndMyRegister';
import OngoingMyRegister from '@/components/user/OngoingMyRegister';
import UserOrderTab from '@/components/user/UserOrderTab';
import useMyAuctionList from '@/hooks/useMyAuctionList';
import { useLocation } from 'react-router-dom';

export const UserRegisteredList = () => {
  const location = useLocation();
  const sortType = location.state?.sortType;
  const [activeTab, setActiveTab] = useState(sortType);
  const loader = useRef(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const { ongoingData, endData, fetchNextOngoingPage, fetchNextEndPage, hasNextOngoingPage, hasNextEndPage, refetchOngoingData, refetchEndData } =
    useMyAuctionList(activeTab);

  const ongoingItems = ongoingData?.pages[0]?.items || [];
  const endItems = endData?.pages[0]?.items || [];

  const handleObserver = useCallback(
    (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting) {
        if (hasNextOngoingPage) {
          fetchNextOngoingPage();
        }
        if (hasNextEndPage) {
          fetchNextEndPage();
        }
      }
    },
    [fetchNextOngoingPage, fetchNextEndPage, hasNextOngoingPage, hasNextEndPage]
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
  }, [fetchNextOngoingPage, fetchNextEndPage, hasNextOngoingPage, hasNextEndPage, handleObserver]);

  useEffect(() => {
    if (activeTab === 'ongoing') {
      refetchOngoingData();
    } else if (activeTab === 'end') {
      refetchEndData();
    }
  }, [activeTab, refetchOngoingData, refetchEndData]);

  return (
    <div className='mx-[-32px] my-[-4px] h-full'>
      <UserOrderTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'ongoing' &&
        <div className='grid grid-cols-2 grid-rows-3 gap-4 p-4 overflow-y-auto'>
          {ongoingItems.map((product: IAuctionOngoingRegisteredItem) => (
            <OngoingMyRegister product={product} key={product.auctionId} />
          ))}
        </div>
      }
      {activeTab === 'end' &&
        <div className='grid grid-cols-2 grid-rows-3 gap-4 p-4 overflow-y-auto'>
          {endItems.map((product: IAuctionEndRegisteredItem) => (
            <EndMyRegister product={product} key={product.auctionId} />
          ))}
        </div>
      }
    </div>
  );
};