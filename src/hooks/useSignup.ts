import { SignupFormSchema } from '@/constants/schema';
import { User } from '@/@types/user';
import { postSignup } from '@/components/login/queries';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
    clearErrors,
  } = useForm<FormFields>({
    defaultValues,
  });

  const signupMutation = useMutation({
    mutationFn: (data: User) => postSignup(data),
    onSuccess: () => {
      navigate('/');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (error.response && error.response.status === 400) {
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

  const formLink = (link: string) => {
    if (link && !link.startsWith('https://')) {
      return `https://${link}`;
    }
    if (link && !link.startsWith('http://')) {
      return `http://${link}`;
    }
    return link;
  };
  const accountNumber = watch('accountNumber');
  useEffect(() => {
    if (accountNumber && accountNumber.length < 10) {
      setError('accountNumber', {
        message: '계좌번호는 최소 10자리 이상이어야 합니다.',
      });
    } else if (accountNumber && accountNumber.length > 15) {
      setError('accountNumber', {
        message: '계좌번호는 최대 15자리 이하여야 합니다.',
      });
    } else {
      clearErrors('accountNumber');
    }
  }, [accountNumber, setError, clearErrors]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = handleSubmit((data: any) => {
    const formattedLink = formLink(data.link);
    const formattedData = { ...data, link: formattedLink };

    signupMutation.mutate(formattedData);
  });

  return {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    activeButtonSheet,
    setError,
    clearErrors,
    setActiveButtonSheet,
    onCloseBottomSheet,
    onSubmit,
    signupMutation,
  };
};
