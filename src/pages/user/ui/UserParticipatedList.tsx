import type { IUserAuctionHistoryItem, IUserAuctionLostItem, IUserAuctionWonItem } from '@/entities';
import { useCallback, useEffect, useRef, useState } from 'react';

import OrderHistoryProduct from '@/components/order/OrderHistoryProduct';
import OrderListTab from '@/components/order/OrderListTab';
import OrderLostProduct from '@/components/order/OrderLostProduct';
import OrderWonProduct from '@/components/order/OrderWonProduct';
import useHistory from '@/hooks/useHistory';
import { useLocation } from 'react-router-dom';

export const UserParticipatedList = () => {
  const location = useLocation();
  const sortType = location.state?.sortType;
  const [activeTab, setActiveTab] = useState(sortType || 'AuctionHistory');
  const loader = useRef(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const {
    historyData,
    wonData,
    lostData,
    historyLoading,
    wonLoading,
    lostLoading,
    fetchNextHistoryPage,
    fetchNextWonPage,
    fetchNextLostPage,
    hasNextHistoryPage,
    hasNextWonPage,
    hasNextLostPage,
    refetchHistoryData,
    refetchWonData,
    refetchLostData,
  } = useHistory(activeTab);
  const historyItems = historyData?.pages[0]?.items || [];
  const wonItems = wonData?.pages[0]?.items || [];
  const lostItems = lostData?.pages[0]?.items || [];

  const handleObserver = useCallback(
    (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting) {
        if (hasNextHistoryPage) {
          fetchNextHistoryPage();
        }
        if (hasNextWonPage) {
          fetchNextWonPage();
        }
        if (hasNextLostPage) {
          fetchNextLostPage();
        }
      }
    },
    [hasNextHistoryPage, fetchNextHistoryPage, hasNextWonPage, fetchNextWonPage, hasNextLostPage, fetchNextLostPage]
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
  }, [hasNextHistoryPage, hasNextWonPage, hasNextLostPage, handleObserver]);

  useEffect(() => {
    if (activeTab === 'AuctionHistory') {
      refetchHistoryData();
    } else if (activeTab === 'AuctionsWon') {
      refetchWonData();
    } else if (activeTab === 'AuctionsLost') {
      refetchLostData();
    }
  }, [activeTab, refetchHistoryData, refetchWonData, refetchLostData]);

  if (historyLoading || wonLoading || lostLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='w-[2rem] h-[2rem] border-2 border-[#F6F8F8] border-opacity-60 rounded-full border-b-cheeseYellow animate-spin' />
      </div>
    );
  }

  return (
    <div className='mx-[-32px] my-[-4px] h-full'>
      <OrderListTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'AuctionHistory' &&
        <div className='grid grid-cols-2 grid-rows-3 gap-4 p-4 overflow-y-auto'>
          {historyItems.map((product: IUserAuctionHistoryItem) => <OrderHistoryProduct key={product.auctionId} product={product} />)}
        </div>
      }
      {activeTab === 'AuctionsWon' &&
        <div className='grid grid-cols-2 grid-rows-3 gap-4 p-4 overflow-y-auto'>
          {wonItems.map((product: IUserAuctionWonItem) => <OrderWonProduct key={product.auctionId} product={product} />)}
        </div>
      }
      {activeTab === 'AuctionsLost' &&
        <div className='grid grid-cols-2 grid-rows-3 gap-4 p-4 overflow-y-auto'>
          {lostItems.map((product: IUserAuctionLostItem) => <OrderLostProduct key={product.auctionId} product={product} />)}
        </div>
      }
    </div>
  );
};