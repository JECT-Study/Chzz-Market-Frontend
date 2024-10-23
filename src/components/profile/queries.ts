import { httpClient } from '@/api/axios';
import { API_END_POINT } from '@/constants/api';
import { queryKeys } from '@/constants/queryKeys';
import { QueryObserverResult, RefetchOptions, UseMutateFunction, useMutation, useQuery } from '@tanstack/react-query';
import { nicknameCheck } from '../login/queries';
import { useNavigate } from 'react-router-dom';
import { IProfileData } from '@/@types/user';

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
} => {
  const navigate = useNavigate();

  const { data: profileData } = useQuery({
    queryKey: [queryKeys.PROFILE],
    queryFn: () => getProfile(),
  });

  const { mutate: profileMutation, isPending} = useMutation({
    mutationFn: (formData: FormData) => postEditProfile(formData),
    onSuccess: () => {
      navigate('/user');
    },
  });

  return { profileData, profileMutation, isPending };
};

export const useCheckNickname = ({ nickname }: { nickname: string }): {
  checkNickname: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
} => {
  const { refetch: checkNickname } = useQuery({
    queryKey: [queryKeys.NICKNAME, nickname],
    queryFn: () => nicknameCheck(nickname),
    enabled: false,
  });

  return { checkNickname };
};