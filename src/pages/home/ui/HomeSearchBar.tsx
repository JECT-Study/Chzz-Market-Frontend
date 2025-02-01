import {
  Command,
  CommandInput,
  CommandList,
  CommandSeparator,
  ROUTES
} from '@/shared';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomeSearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`${ROUTES.AUCTION_SEARCH}`);
  };

  const handleValueChange = (value: string) => {
    setInputValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Command>
      <form onSubmit={handleSubmit}>
        <CommandInput
          placeholder="검색어를 입력하세요"
          value={inputValue}
          onValueChange={handleValueChange}
          onKeyDown={handleKeyDown}
          onIconClick={handleSubmit}
        />
        <CommandList className="hidden">
          <CommandSeparator />
        </CommandList>
      </form>
    </Command>
  );
};
