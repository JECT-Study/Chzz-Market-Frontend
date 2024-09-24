import Layout from '@/components/layout/Layout';
import Navigation from '@/components/navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import UserOrderTab from '@/components/user/UserOrderTab';
import useMyAuctionList from '@/hooks/useMyAuctionList';
import OngoingMyRegister from '@/components/user/OngoingMyRegister';
import {
  OngoingAuctionRegisterdItem,
  PreEnrollProductRegisteredItem,
} from '@/@types/productList';
import PreEnrollMyRegister from '@/components/user/PreEnrollMyRegister';

const UserRegisteredList = () => {
  const [activeTab, setActiveTab] = useState(true);
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
      <Layout.Header title="마이페이지" handleBack={() => navigate('/')} />
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
        <Navigation active="my" />
      </Layout.Footer>
    </Layout>
  );
};

export default UserRegisteredList;
