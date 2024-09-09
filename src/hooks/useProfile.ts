import { getProfile } from '@/components/profile/queries';
import { queryKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () => {
  const { data: profileData } = useQuery({
    queryKey: [queryKeys.PROFILE],
    queryFn: () => getProfile(),
  });

  return {
    profileData,
  };
};
