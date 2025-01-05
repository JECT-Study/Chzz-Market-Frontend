import { ROUTES } from "@/shared";
import { Command, CommandInput, CommandList, CommandSeparator } from "@/shared/ui/Command";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomeSearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`${ROUTES.AUCTION_SEARCH}?keyword=${inputValue}`)
  }

  const handleValueChange = (value: string) => {
    setInputValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className='flex'>
      <Command className="rounded-lg border shadow-xs">
        <form onSubmit={handleSubmit}>
          <CommandInput 
            placeholder="검색어를 입력하세요" 
            value={inputValue}
            onValueChange={handleValueChange}
            onKeyDown={handleKeyDown}
            onIconClick={handleSubmit}
          />
          <CommandList>
            <CommandSeparator />
          </CommandList>
        </form>
      </Command>
    </div>
  );
};