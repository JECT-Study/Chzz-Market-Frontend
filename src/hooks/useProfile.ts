import { IUserProfile } from '@/@types/user';
import { useProfile } from '@/components/profile/queries';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

export const useEditProfile = () => {
  const location = useLocation();
  const { userNickname: originalNickname, userBio, userProfileImageUrl } = location.state || {};
  const { profileMutation, isPending } = useProfile();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserProfile>({
    defaultValues: {
      nickname: originalNickname || '',
      bio: userBio || '',
    }
  });

  const handleEditProfile = (formData: FormData) => {
    profileMutation(formData);
  };

  return {
    handleEditProfile,
    control,
    watch,
    handleSubmit,
    originalNickname,
    userProfileImageUrl,
    errors,
    isPending,
  };
};
