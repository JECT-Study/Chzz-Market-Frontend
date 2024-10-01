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
  const { nickname, bio } = location.state || {};

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfile>({
    defaultValues: {
      nickname: nickname || '',
      bio: bio || '',
    }
  });

  const profileMutation = useMutation({
    mutationFn: (data: UserProfile) => postEditProfile(data),
    onSuccess: () => {
      navigate('/user');
    },
  });

  const formLink = (link: string) => {
    if (link && !link.startsWith('https://')) {
      return `https://${link}`;
    }
    if (link && !link.startsWith('http://')) {
      return `http://${link}`;
    }
    return link;
  };

  const handleEditProfile = (data: UserProfile) => {
    const formattedLink = formLink(data.link);
    const formattedData = { ...data, link: formattedLink };

    profileMutation.mutate(formattedData);
  };

  return {
    handleEditProfile,
    control,
    watch,
    handleSubmit,
    errors,
  };
};
