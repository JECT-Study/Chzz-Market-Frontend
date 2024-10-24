import { useCallback, useEffect, useRef, useState } from 'react';

import EmptyBoundary from '@/components/common/boundary/EmptyBoundary';
import type { IPreAuctionRegisteredItem } from '@/@types/AuctionItem';
import PreEnrollMyRegister from '@/components/user/PreEnrollMyRegister';
import { useLocation } from 'react-router-dom';
import useMyAuctionList from '@/hooks/useMyAuctionList';

const UserPreRegisteredList = () => {
  const location = useLocation();
  const sortType = location.state?.sortType;
  const [activeTab, _setActiveTab] = useState(sortType);
  const loader = useRef(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const { enrollData, fetchNextEnrollPage, hasNextEnrollPage, refetchEnrollData } =
    useMyAuctionList(activeTab);

  const enrollItems = enrollData?.pages[0]?.items || [];

  const handleObserver = useCallback(
    (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting) {
        if (hasNextEnrollPage) {
          fetchNextEnrollPage();
        }
      }
    },
    [fetchNextEnrollPage, hasNextEnrollPage]
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
  }, [fetchNextEnrollPage, hasNextEnrollPage, handleObserver]);

  useEffect(() => {
    if (activeTab === 'end') {
      refetchEnrollData();
    }
  }, [activeTab, refetchEnrollData]);

  return (
    <div className='mx-[-32px] my-[-4px] h-full'>
      {activeTab === 'preAuction' &&
        <EmptyBoundary length={enrollItems.length} name='userPreAuction'>
          <div className='grid grid-cols-2 grid-rows-3 gap-4 p-4 overflow-y-auto'>
            {enrollItems.map((product: IPreAuctionRegisteredItem) => (
              <PreEnrollMyRegister product={product} key={product.productId} />
            ))}
          </div>
        </EmptyBoundary>
      }
    </div>
  );
};

export default UserPreRegisteredList;
