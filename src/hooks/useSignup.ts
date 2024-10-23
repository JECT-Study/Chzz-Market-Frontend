import { SignupFormSchema } from '@/constants/schema';
import type { IUser } from '@/@types/user';
import { usePostSignup } from '@/components/login/queries';
import { Control, UseFormHandleSubmit, useForm } from 'react-hook-form';
import { z } from 'zod';

type FormFields = z.infer<typeof SignupFormSchema>;

interface IUseSignupReturn {
  control: Control<FormFields>;
  handleSubmit: UseFormHandleSubmit<FormFields>;
  watch: () => Partial<FormFields>;
  setValue: (name: keyof FormFields, value: any) => void;
  onSubmit: () => void;
  signupMutation: ReturnType<typeof usePostSignup>['signupMutation'];
  isPending: boolean;
}


const defaultValues = {
  nickname: '',
  bio: ''
};

export const useSignup = (): IUseSignupReturn => {
  const { signupMutation, isPending } = usePostSignup();
  const {
    control,
    setValue,
    handleSubmit,
    watch,
  } = useForm<FormFields>({
    defaultValues,
  });

  const onSubmit = handleSubmit((data: IUser) => {
    signupMutation(data);
  });

  return {
    control,
    handleSubmit,
    watch,
    setValue,
    onSubmit,
    signupMutation,
    isPending
  };
};
