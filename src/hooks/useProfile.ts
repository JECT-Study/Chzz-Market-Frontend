import { UserProfile } from '@/@types/user';
import { getProfile, postEditProfile } from '@/components/profile/queries';
import { queryKeys } from '@/constants/queryKeys';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const location = useLocation();
  const { userNickname: originalNickname, userBio, userLink, userProfileImageUrl } = location.state || {};

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfile>({
    defaultValues: {
      nickname: originalNickname || '',
      bio: userBio || '',
      link: userLink || '',
    }
  });

  const profileMutation = useMutation({
    mutationFn: (formData: FormData) => postEditProfile(formData),
    onSuccess: () => {
      navigate('/user');
    },
  });

  const handleEditProfile = (formData: FormData) => {
    profileMutation.mutate(formData);
  };

  return {
    handleEditProfile,
    control,
    watch,
    handleSubmit,
    originalNickname,
    userProfileImageUrl,
    errors,
  };
};
