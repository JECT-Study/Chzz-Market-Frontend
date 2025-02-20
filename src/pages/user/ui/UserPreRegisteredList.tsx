import { useCallback, useEffect, useRef, useState } from 'react';

import type { IPreAuctionRegisteredItem } from '@/entities/auction';
import { useMyAuctionList } from '@/features/user/model';
import { PreAuctionMyRegister } from '@/features/user/ui';
import { EmptyBoundary } from '@/shared/ui/boundary/EmptyBoundary';
import { useLocation } from 'react-router';

export const UserPreRegisteredList = () => {
  const location = useLocation();
  const sortType = location.state?.sortType;
  const [activeTab, _setActiveTab] = useState(sortType);
  const loader = useRef(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const { enrollData, fetchNextEnrollPage, hasNextEnrollPage } =
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
      threshold: 1.0
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

  return (
    <div className="mx-[-32px] my-[-4px] h-full">
      <EmptyBoundary type="userPreAuction" length={enrollItems.length}>
        <div className="grid grid-cols-2 grid-rows-3 gap-4 p-4 overflow-y-auto">
          {enrollItems.map((product: IPreAuctionRegisteredItem) => (
            <PreAuctionMyRegister product={product} key={product.auctionId} />
          ))}
        </div>
      </EmptyBoundary>
    </div>
  );
};
