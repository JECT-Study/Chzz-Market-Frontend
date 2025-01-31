import { QUERY_KEYS } from '@/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getHeartList } from '..';

export const useGetHeartList = () => {
  const { data: heartList } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.HEART_LIST],
    queryFn: getHeartList
  });

  return { heartList: heartList.items };
};
