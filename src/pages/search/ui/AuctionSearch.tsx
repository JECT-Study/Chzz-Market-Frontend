import { IAuctionSearchItem, IPreAuctionItem } from '@/entities';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  GlobalSpinner
} from '@/shared';
import { useEffect, useState } from 'react';

import { Layout } from '@/app/layout';
import { getAuctionSearch } from '@/features/auction-search/api';
import { getPreAuctionSearch } from '@/features/auction-search/api/getPreAuctionSearch';
import { ProductListTabs } from '@/features/product-list';
import EmptyIcon from '@/shared/assets/icons/empty.svg';
import { useSearchParams } from 'react-router';
import { AuctionSearchItem } from './AuctionSearchItem';
import { PreAuctionSearchItem } from './PreAuctionSearchItem';

export const AuctionSearch = () => {
  const [searchParams] = useSearchParams();
  const originalInputValue = searchParams.get('keyword') || '';
  const [activeTab, setActiveTab] = useState('ongoing');
  const [keyword, setKeyword] = useState(originalInputValue);
  const [items, setItems] = useState([]);
  const [preItems, setPreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const ongoingFlag = activeTab === 'ongoing';

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      if (keyword.trim()) {
        if (activeTab === 'ongoing') {
          getAuctionSearch(keyword)
            .then((data) => {
              setItems(data.items || []);
            })
            .finally(() => setIsLoading(false));
        } else {
          getPreAuctionSearch(keyword)
            .then((data) => {
              setPreItems(data.items || []);
            })
            .finally(() => setIsLoading(false));
        }
      } else {
        setItems([]);
        setPreItems([]);
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword, activeTab]);

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    setIsLoading(true);
    if (value.length === 0) {
      setItems([]);
      setPreItems([]);
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Command style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
        <Layout.Header>
          <CommandInput
            placeholder="검색어를 입력하세요"
            value={keyword}
            onValueChange={handleKeywordChange}
          />
        </Layout.Header>
        <ProductListTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <CommandList>
          {isLoading ? (
            <GlobalSpinner />
          ) : (
            <>
              {/* 전체 검색 결과가 없는 경우 */}
              {items.length === 0 && preItems.length === 0 && (
                <div
                  style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
                  className="flex flex-col items-center justify-center w-full h-full gap-2 rounded"
                >
                  <img src={EmptyIcon} alt="emptyIcon" className="size-10" />
                  <CommandEmpty className="md:text-heading3 text-body1 text-gray2">
                    검색 결과가 없습니다.
                  </CommandEmpty>
                </div>
              )}

              {/* 정식 경매 검색 결과가 있는 경우 */}
              {ongoingFlag && items.length > 0 && (
                <div className="grid grid-cols-2 gap-6 p-2 overflow-y-auto web:p-4">
                  {items.map((product: IAuctionSearchItem) => (
                    <AuctionSearchItem
                      key={product.auctionId}
                      product={product}
                    />
                  ))}
                </div>
              )}

              {/* 사전 경매 검색 결과가 있는 경우 */}
              {!ongoingFlag && preItems.length > 0 && (
                <div className="grid grid-cols-2 gap-6 p-2 overflow-y-auto web:p-4">
                  {preItems.map((product: IPreAuctionItem) => (
                    <PreAuctionSearchItem
                      key={product.auctionId}
                      product={product}
                    />
                  ))}
                </div>
              )}

              {/* 정식 경매만 없고, 사전 경매는 있을 때 */}
              {ongoingFlag && items.length === 0 && preItems.length > 0 && (
                <div
                  style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
                  className="flex flex-col items-center justify-center w-full h-full gap-2"
                >
                  <img src={EmptyIcon} alt="emptyIcon" className="size-10" />
                  <CommandEmpty className="md:text-heading3 text-body1 text-gray2">
                    정식 경매에는 검색된 상품이 없습니다.
                  </CommandEmpty>
                </div>
              )}

              {/* 사전 경매만 없고, 정식 경매는 있을 때 */}
              {!ongoingFlag && preItems.length === 0 && items.length > 0 && (
                <div
                  style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
                  className="flex flex-col items-center justify-center w-full h-full gap-2"
                >
                  <img src={EmptyIcon} alt="emptyIcon" className="size-10" />
                  <CommandEmpty className="md:text-heading3 text-body1 text-gray2">
                    사전 경매에는 검색된 상품이 없습니다.
                  </CommandEmpty>
                </div>
              )}
            </>
          )}
        </CommandList>
      </Command>
    </Layout>
  );
};
