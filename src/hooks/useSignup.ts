import { SignupFormSchema } from '@/constants/schema';
import { User } from '@/@types/user';
import { postSignup } from '@/components/login/queries';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { z } from 'zod';

type FormFields = z.infer<typeof SignupFormSchema>;

const defaultValues = {
  nickname: '',
  bankName: '',
  accountNumber: '',
  bio: '',
  link: '',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useSignup = (): any => {
  const [activeButtonSheet, setActiveButtonSheet] = useState(false);
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: (data: User) => postSignup(data),
    onSuccess: () => {
      navigate('/user');
    },
    onError: () => {},
  });

  const {
    control,
    setValue,
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
    setValue,
    activeButtonSheet,
    setActiveButtonSheet,
    onCloseBottomSheet,
    onSubmit,
    signupMutation,
  };
};
