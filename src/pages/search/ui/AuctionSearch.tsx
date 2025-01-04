import { IAuctionSearchItem } from "@/entities";
import { getAuctionSearch } from "@/features/auction-search/api";
import { Command, CommandInput, CommandList } from "@/shared/ui/Command"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { AuctionSearchItem } from "./AuctionSearchItem";

export const AuctionSearch = () => {
  const [searchParams] = useSearchParams();
  const originalInputValue = searchParams.get("keyword") || "";
  const [keyword, setKeyword] = useState(originalInputValue);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword.trim()) {
        getAuctionSearch(keyword).then((data) => {
          setItems(data.items || []);
        });
      } else {
        setItems([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);

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
      <CommandList>
        <div className='grid grid-cols-2 grid-rows-3 gap-4 p-4 overflow-y-auto'>
          {items.map((el: IAuctionSearchItem) => (
            <AuctionSearchItem key={el.auctionId} product={el} />
          ))}
        </div>
      </CommandList>
    </Command>
  )
}
