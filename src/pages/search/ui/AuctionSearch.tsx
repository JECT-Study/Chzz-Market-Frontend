import { IAuctionSearchItem } from "@/entities";
import { getAuctionSearch } from "@/features/auction-search/api";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/shared/ui/Command"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";

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
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item: IAuctionSearchItem) => (
            <CommandItem key={item.auctionId}>
              <img
                src={item.imageUrl}
                alt={item.auctionName}
                className="mr-2 h-6 w-6 rounded-md"
              />
              <span>{item.auctionName}</span>
            </CommandItem>
          ))
        ) : (
          <CommandEmpty>검색 결과가 존재하지 않습니다.</CommandEmpty>
        )}
        <CommandSeparator />
      </CommandList>
    </Command>
  )
}
