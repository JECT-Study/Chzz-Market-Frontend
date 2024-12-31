import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/shared/ui/Command";

export const HomeCommand = () => {
  return (
    <Command>
      <CommandInput placeholder="검색어를 입력해주세요" />
      <CommandList>
        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>가방</CommandItem>
          <CommandItem>가방끈</CommandItem>
          <CommandItem>가방방</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};