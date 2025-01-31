import type { IProfileData } from '@/entities/user/user';
import { QUERY_KEYS } from '@/shared';
import {
  UseMutateFunction,
  useMutation,
  useQuery
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../api/getProfile';
import { postEditProfile } from '../api/postEditProfile';

export const useProfile = (): {
  profileData: IProfileData;
  profileMutation: UseMutateFunction<any, Error, FormData, unknown>;
  isPending: boolean;
  isLoading: boolean;
} => {
  const navigate = useNavigate();

  const { data: profileData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: () => getProfile()
  });

  const { mutate: profileMutation, isPending } = useMutation({
    mutationFn: (formData: FormData) => postEditProfile(formData),
    onSuccess: () => {
      navigate('/user', { replace: true });
    }
  });

  return { profileData, profileMutation, isPending, isLoading };
};
