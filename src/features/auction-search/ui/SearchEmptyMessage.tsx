import { CommandEmpty } from '@/shared';
import EmptyIcon from '@/shared/assets/icons/empty.svg';

const SearchEmptyMessage = () => {
  return (
    <div
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
      className="flex flex-col items-center justify-center w-full h-full gap-2 rounded"
    >
      <img src={EmptyIcon} alt="emptyIcon" className="size-10" />
      <CommandEmpty className="md:text-heading3 text-body1 text-gray2">
        검색 결과가 없습니다.
      </CommandEmpty>
    </div>
  );
};

export default SearchEmptyMessage;
