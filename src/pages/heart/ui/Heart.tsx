import { HeartList } from "@/features/heart";

export const Heart = () => {
  return (
    <ul className='grid items-center justify-between grid-cols-2 gap-4'>
      <HeartList />
    </ul>
  );
};