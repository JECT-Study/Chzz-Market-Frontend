import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { SignupFormSchema } from '@/constants/schema';
import { useMutation } from '@tanstack/react-query';
import { postSignup } from '@/components/login/queries';

type SignupForm = z.infer<typeof SignupFormSchema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useSignup = (): any => {
  const [activeButtonSheet, setActiveButtonSheet] = useState(false);
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      navigate('/mypage');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>();

  const onCloseBottomSheet = () => {
    setActiveButtonSheet(!activeButtonSheet);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = handleSubmit((data: any) => {
    signupMutation.mutate(data);
  });

  return {
    register,
    handleSubmit,
    watch,
    errors,
    activeButtonSheet,
    setActiveButtonSheet,
    onCloseBottomSheet,
    onSubmit,
    signupMutation,
  };
};
