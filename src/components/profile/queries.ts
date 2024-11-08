import { IProfileData } from '@/@types/user';
import { httpClient } from '@/shared/api/axios';
import { API_END_POINT } from '@/shared/constants/apiEndPoint';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { QueryObserverResult, RefetchOptions, UseMutateFunction, useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { nicknameCheck } from '../login/queries';

export const getProfile = async () => {
  const response = await httpClient.get(`${API_END_POINT.SIGNUP}`);
  return response.data;
};

export const postEditProfile = async (formData: FormData) => {
  const response = await httpClient.post(`${API_END_POINT.PROFILE}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useProfile = (): {
  profileData: IProfileData;
  profileMutation: UseMutateFunction<any, Error, FormData, unknown>;
  isPending: boolean;
  isLoading: boolean;
} => {
  const navigate = useNavigate();

  const { data: profileData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: () => getProfile(),
  });

  const { mutate: profileMutation, isPending } = useMutation({
    mutationFn: (formData: FormData) => postEditProfile(formData),
    onSuccess: () => {
      navigate('/user', { replace: true });
    },
  });

  return { profileData, profileMutation, isPending, isLoading };
};

export const useCheckNickname = ({
  nickname,
}: {
  nickname: string;
}): {
  checkNickname: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
} => {
  const { refetch: checkNickname } = useQuery({
    queryKey: [QUERY_KEYS.NICKNAME, nickname],
    queryFn: () => nicknameCheck(nickname),
    enabled: false,
  });

  return { checkNickname };
};
