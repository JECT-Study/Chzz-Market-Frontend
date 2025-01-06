import { IAuctionSearchItem, IPreAuctionItem } from "@/entities";
import { getAuctionSearch } from "@/features/auction-search/api";
import { Command, CommandInput, CommandList } from "@/shared/ui/Command"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuctionSearchItem } from "./AuctionSearchItem";
import { EmptyBoundary, GlobalSpinner } from "@/shared";
import { getPreAuctionSearch } from "@/features/auction-search/api/getPreAuctionSearch";
import { ProductListTabs } from "@/features/product-list";
import BackArrowIcon from '@/shared/assets/icons/back_arrow.svg';
import { PreAuctionSearchItem } from "./PreAuctionSearchItem";

export const AuctionSearch = () => {
  const [searchParams] = useSearchParams();
  const originalInputValue = searchParams.get("keyword") || "";
  const [activeTab, setActiveTab] = useState('ongoing');
  const [keyword, setKeyword] = useState(originalInputValue);
  const [items, setItems] = useState([]);
  const [preItems, setPreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const ongoingFlag = activeTab === 'ongoing';  

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      if (keyword.trim()) {
        if (activeTab === 'ongoing') {
          getAuctionSearch(keyword).then((data) => {
            setItems(data.items || []);
          }).finally(() => setIsLoading(false));
        } else {
          getPreAuctionSearch(keyword).then((data) => {
            setPreItems(data.items || []);
          }).finally(() => setIsLoading(false));
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
    <Command className="shadow-md md:min-w-[450px]">
      <header className='w-full h-[3.375rem] p-4 web:p-8  shadow-bottom'>
        <div className='relative flex items-center justify-center w-full h-full'>
          <button
            className='absolute left-0'
            aria-label='뒤로 가기'
            onClick={() => navigate(-1)}
          >
            <img src={BackArrowIcon} alt='뒤로가기 아이콘' className='size-6' />
          </button>
          <CommandInput 
            placeholder="검색어를 입력하세요" 
            value={keyword}
            onValueChange={handleKeywordChange}
          />
        </div>
      </header>
      <ProductListTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <CommandList>
        {isLoading ? (
          <GlobalSpinner />
        ): (
          <EmptyBoundary type='category' length={ongoingFlag ? items.length : preItems.length}>
            <div className='grid grid-cols-2 gap-6 p-2 web:p-4 overflow-y-auto'>
              {ongoingFlag ? items?.map((product: IAuctionSearchItem) => (
                <AuctionSearchItem key={product.auctionId} product={product} />
              )) : preItems?.map((product: IPreAuctionItem) => (
                <PreAuctionSearchItem key={product.auctionId} product={product} />
              ))}
            </div>
          </EmptyBoundary>
        )}
      </CommandList>
    </Command>
  )
}
