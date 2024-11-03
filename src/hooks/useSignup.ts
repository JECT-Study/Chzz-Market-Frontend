import { usePostSignup } from '@/components/login/queries';
import { SignupFormSchema } from '@/shared/constants/schema';
import { Control, UseFormHandleSubmit, useForm } from 'react-hook-form';
import { z } from 'zod';

type FormFields = z.infer<typeof SignupFormSchema>;

interface IUseSignupReturn {
  control: Control<FormFields>;
  handleSubmit: UseFormHandleSubmit<FormFields>;
  watch: () => Partial<FormFields>;
  setValue: (name: keyof FormFields, value: any) => void;
  signupMutation: ReturnType<typeof usePostSignup>['signupMutation'];
  isPending: boolean;
}

const defaultValues = {
  nickname: '',
  bio: '',
};

export const useSignup = (): IUseSignupReturn => {
  const { signupMutation, isPending } = usePostSignup();
  const { control, setValue, handleSubmit, watch } = useForm<FormFields>({
    defaultValues,
  });

  return {
    control,
    handleSubmit,
    watch,
    setValue,
    signupMutation,
    isPending,
  };
};
