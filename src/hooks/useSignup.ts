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

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<FormFields>({
    defaultValues,
  });

  const signupMutation = useMutation({
    mutationFn: (data: User) => postSignup(data),
    onSuccess: () => {
      navigate('/user');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (error.repsonse && error.repsonse.status === 400) {
        const errorMessage = error.response.data?.message || '';
        if (errorMessage.includes('닉네임이 중복되었습니다.')) {
          setError('nickname', { message: '이미 사용 중인 닉네임입니다.' });
        }
      }
    },
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
