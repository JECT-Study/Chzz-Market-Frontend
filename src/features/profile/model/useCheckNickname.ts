import { nicknameCheck } from '@/features/auth/api';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery
} from '@tanstack/react-query';

export const useCheckNickname = ({
  nickname
}: {
  nickname: string;
}): {
  checkNickname: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
} => {
  const { refetch: checkNickname } = useQuery({
    queryKey: [QUERY_KEYS.NICKNAME, nickname],
    queryFn: () => nicknameCheck(nickname),
    enabled: false
  });

  return { checkNickname };
};
