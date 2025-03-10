import { CommandEmpty } from '@/shared/ui/Command';
import { Icon } from '@/shared/ui/Icon';

const SearchEmptyMessage = () => {
  return (
    <div
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
      className="flex flex-col items-center justify-center w-full h-full gap-2 rounded"
    >
      <Icon name='empty' style='size-10' />
      <CommandEmpty className="md:text-heading3 text-body1 text-gray2">
        검색 결과가 없습니다.
      </CommandEmpty>
    </div>
  );
};

export default SearchEmptyMessage;
