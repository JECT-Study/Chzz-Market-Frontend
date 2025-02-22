import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getHeartList } from '../api/getHeartList';

export const useGetHeartList = () => {
  const { data: heartList } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.HEART_LIST],
    queryFn: getHeartList
  });

  return { heartList: heartList.items };
};
