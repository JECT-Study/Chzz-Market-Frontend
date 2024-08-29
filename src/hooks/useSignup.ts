import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { SignupFormSchema } from '@/constants/schema';
import { useMutation } from '@tanstack/react-query';
import { User } from '@/@types/user';
import { postSignup } from '@/components/login/queries';

type FormFields = z.infer<typeof SignupFormSchema>;

const defaultValues = {
  nickname: '',
  bank: '',
  accountNumber: '',
  introduction: '',
  link: '',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useSignup = (): any => {
  const [activeButtonSheet, setActiveButtonSheet] = useState(false);
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: (data: User) => postSignup(data),
    onSuccess: () => {
      navigate('/mypage');
    },
    onError: (error) => {},
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues,
  });

  const onCloseBottomSheet = () => {
    setActiveButtonSheet(!activeButtonSheet);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = handleSubmit((data: any) => {
    signupMutation.mutate(data);
  });

  return {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    activeButtonSheet,
    setActiveButtonSheet,
    onCloseBottomSheet,
    onSubmit,
    signupMutation,
  };
};
