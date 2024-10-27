import { useProfile } from '@/components/profile/queries';
import { ProfileEditFormSchema } from '@/constants/schema';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { z } from 'zod';

type FormFields = z.infer<typeof ProfileEditFormSchema>;

export const useEditProfile = () => {
  const location = useLocation();
  const { userNickname: originalNickname, userBio, userProfileImageUrl } = location.state || {};
  const { profileMutation, isPending } = useProfile();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
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
