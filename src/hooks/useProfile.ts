import { UserProfile } from '@/@types/user';
import { getProfile, postEditProfile } from '@/components/profile/queries';
import { queryKeys } from '@/constants/queryKeys';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const useProfile = () => {
  const { data: profileData } = useQuery({
    queryKey: [queryKeys.PROFILE],
    queryFn: () => getProfile(),
  });

  return {
    profileData,
  };
};

export const useEditProfile = () => {
  const navigate = useNavigate();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfile>();

  const profileMutation = useMutation({
    mutationFn: (data: UserProfile) => postEditProfile(data),
    onSuccess: () => {
      navigate('/user');
    },
  });

  const handleEditProfile = (data: UserProfile) => {
    profileMutation.mutate(data);
  };

  return {
    handleEditProfile,
    control,
    watch,
    handleSubmit,
    errors,
  };
};
