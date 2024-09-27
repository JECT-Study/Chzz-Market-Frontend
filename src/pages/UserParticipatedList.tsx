import OrderListTab from '@/components/order/OrderListTab';
import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import useHistory from '@/hooks/useHistory';
import OrderHistoryProduct from '@/components/order/OrderHistoryProduct';
import OrderWonProduct from '@/components/order/OrderWonProduct';
import OrderLostProduct from '@/components/order/OrderLostProduct';
import {
  MyHistoryAuctionListItem,
  MyLostAuctionListItem,
  MyWonAuctionListItem,
} from '@/@types/productList';

const UserParticipatedList = () => {
  const location = useLocation();
  const sortType = location.state?.sortType;
  const [activeTab, setActiveTab] = useState(sortType || 'AuctionHistory');
  const loader = useRef(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const {
    historyData,
    wonData,
    lostData,
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
    [
      hasNextHistoryPage,
      fetchNextHistoryPage,
      hasNextWonPage,
      fetchNextWonPage,
      hasNextLostPage,
      fetchNextLostPage,
    ],
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

  return (
    <div className="mx-[-32px] my-[-16px]">
      <OrderListTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'AuctionHistory' &&
        historyItems.map((product: MyHistoryAuctionListItem) => (
          <OrderHistoryProduct key={product.id} product={product} />
        ))}
      {activeTab === 'AuctionsWon' &&
        wonItems.map((product: MyWonAuctionListItem) => (
          <OrderWonProduct key={product.id} product={product} />
        ))}
      {activeTab === 'AuctionsLost' &&
        lostItems.map((product: MyLostAuctionListItem) => (
          <OrderLostProduct key={product.id} product={product} />
        ))}
    </div>
  );
};

export default UserParticipatedList;
