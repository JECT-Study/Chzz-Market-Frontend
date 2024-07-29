/* eslint-disable import/no-cycle */
import { useQuery } from '@tanstack/react-query';
import { getTest } from '@/api/test.api';
/* eslint-disable import/no-cycle */

export interface TestItems {
  id: number;
  name: string;
  startPrice: string;
  timeLeft: string;
  activeUserCount: string;
  isBidding: boolean;
}

const Test = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['TEST'],
    queryFn: () => getTest(),
  });

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      {data?.test?.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */,
          index: number /* eslint-disable-line @typescript-eslint/no-unused-vars */,
        ) => <div key={item.id}>{item.name}</div>,
      )}
    </div>
  );
};

export default Test;
