import {
  OngoingAuctionRegisterdItem,
  PreEnrollProductRegisteredItem,
} from '@/@types/productList';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import Navigation from '@/components/navigation/Navigation';
import OngoingMyRegister from '@/components/user/OngoingMyRegister';
import PreEnrollMyRegister from '@/components/user/PreEnrollMyRegister';
import UserOrderTab from '@/components/user/UserOrderTab';
import useMyAuctionList from '@/hooks/useMyAuctionList';

const UserRegisteredList = () => {
  const location = useLocation();
  const sortType = location.state?.sortType;
  const [activeTab, setActiveTab] = useState(sortType || true);
  const navigate = useNavigate();
  const loader = useRef(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const {
    ongoingData,
    enrollData,
    fetchNextOngoingPage,
    fetchNextEnrollPage,
    hasNextOngoingPage,
    hasNextEnrollPage,
    refetchOngoingData,
    refetchEnrollData,
  } = useMyAuctionList(activeTab, 'nickname');

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
    [
      fetchNextOngoingPage,
      fetchNextEnrollPage,
      hasNextOngoingPage,
      hasNextEnrollPage,
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
  }, [fetchNextOngoingPage, hasNextOngoingPage, handleObserver]);

  useEffect(() => {
    if (activeTab === true) {
      refetchOngoingData();
    } else {
      refetchEnrollData();
    }
  }, [activeTab, refetchOngoingData, refetchEnrollData]);

  return (
    <Layout>
      <Layout.Header
        title="내가 등록한 경매 내역"
        handleBack={() => navigate('/')}
      />
      <Layout.Main
        style={{ paddingLeft: 0, paddingRight: 0 }}
        ref={mainContainerRef}
      >
        <UserOrderTab activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="p-4 h-[calc(100vh-100px)] overflow-y-auto">
          {activeTab
            ? ongoingItems.map((product: OngoingAuctionRegisterdItem) => (
                <OngoingMyRegister product={product} key={product.id} />
              ))
            : enrollItems.map((product: PreEnrollProductRegisteredItem) => (
                <PreEnrollMyRegister product={product} key={product.id} />
              ))}
        </div>
      </Layout.Main>
      <Layout.Footer type="single">
        <Navigation active="user" />
      </Layout.Footer>
    </Layout>
  );
};

export default UserRegisteredList;
