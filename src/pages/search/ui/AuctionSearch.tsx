import { IAuctionSearchItem, IPreAuctionItem } from "@/entities";
import { getAuctionSearch } from "@/features/auction-search/api";
import { Command, CommandInput, CommandList } from "@/shared/ui/Command"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { AuctionSearchItem } from "./AuctionSearchItem";
import { EmptyBoundary } from "@/shared";
import { getPreAuctionSearch } from "@/features/auction-search/api/getPreAuctionSearch";
import { ProductListTabs } from "@/features/product-list";
import { PreAuctionSearchItem } from "./PreAuctionSearchItem";

export const AuctionSearch = () => {
  const [searchParams] = useSearchParams();
  const originalInputValue = searchParams.get("keyword") || "";
  const [activeTab, setActiveTab] = useState('ongoing');
  const [keyword, setKeyword] = useState(originalInputValue);
  const [items, setItems] = useState([]);
  const [preItems, setPreItems] = useState([]);
  const ongoingFlag = activeTab === 'ongoing';

  

  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword.trim()) {
        if (activeTab === 'ongoing') {
          getAuctionSearch(keyword).then((data) => {
            setItems(data.items || []);
          });
        } else {
          getPreAuctionSearch(keyword).then((data) => {
            setPreItems(data.items || []);
          });
        }
      } else {
        setItems([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword, activeTab]);

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
  };

  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput 
        placeholder="검색어를 입력하세요" 
        value={keyword}
        onValueChange={handleKeywordChange}
      />
      <ProductListTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <CommandList>
        <EmptyBoundary type='category' length={ongoingFlag ? items.length : preItems.length}>
          <div className='grid grid-cols-2 gap-6 p-2 web:p-4 overflow-y-auto'>
            {ongoingFlag ? items?.map((product: IAuctionSearchItem) => (
              <AuctionSearchItem key={product.auctionId} product={product} />
            )) : preItems?.map((product: IPreAuctionItem) => (
              <PreAuctionSearchItem key={product.auctionId} product={product} />
            ))}
          </div>
        </EmptyBoundary>
      </CommandList>
    </Command>
  )
}
