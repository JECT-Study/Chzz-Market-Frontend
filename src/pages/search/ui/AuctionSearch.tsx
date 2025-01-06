import { IAuctionSearchItem, IPreAuctionItem } from "@/entities";
import { getAuctionSearch } from "@/features/auction-search/api";
import { Command, CommandEmpty, CommandInput, CommandList } from "@/shared/ui/Command"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuctionSearchItem } from "./AuctionSearchItem";
import { GlobalSpinner } from "@/shared";
import { getPreAuctionSearch } from "@/features/auction-search/api/getPreAuctionSearch";
import { ProductListTabs } from "@/features/product-list";
import BackArrowIcon from '@/shared/assets/icons/back_arrow.svg';
import { PreAuctionSearchItem } from "./PreAuctionSearchItem";
import EmptyIcon from '@/shared/assets/icons/empty.svg';

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
    <Command>
      <header className='w-full h-[3.375rem] p-4 web:p-8 shadow-bottom'>
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
        ) : items.length === 0 && preItems.length === 0 ? (
          <div className='flex flex-col items-center justify-center w-full h-screen gap-2 rounded min-h-28'>
            <img src={EmptyIcon} alt='emptyIcon' className='size-7' />
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          </div>
        ) : (
          <div className='grid grid-cols-2 gap-6 p-2 web:p-4 overflow-y-auto'>
            {ongoingFlag
              ? items?.map((product: IAuctionSearchItem) => (
                  <AuctionSearchItem key={product.auctionId} product={product} />
                ))
              : preItems?.map((product: IPreAuctionItem) => (
                  <PreAuctionSearchItem key={product.auctionId} product={product} />
                ))}
          </div>
        )}
      </CommandList>
    </Command>
  )
}
