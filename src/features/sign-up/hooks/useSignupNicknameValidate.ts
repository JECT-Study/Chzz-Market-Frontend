import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setIsNameValid, setIsNicknameCheckDisabled, setIsNicknameChecked, setIsSubmitEnabled, setNicknameError } from '../model/signupSlice';
import { useCheckNickname } from '@/features/profile/model';

interface UseNicknameProps {
  nickname: string;
}

export const useSignupNicknameValidate = ({ nickname }: UseNicknameProps) => {
  const dispatch = useDispatch();
  const { checkNickname } = useCheckNickname({ nickname });

  const handleNicknameValidation = (isAvailable: boolean) => {
    if (!nickname || nickname === '') {
      dispatch(setNicknameError('닉네임을 입력해주세요.'));
      dispatch(setIsNicknameChecked(false));
      dispatch(setIsSubmitEnabled(false));
      dispatch(setIsNameValid(false));
    } else if (isAvailable) {
      dispatch(setNicknameError('사용 가능한 닉네임입니다.'));
      dispatch(setIsNicknameChecked(true));
      dispatch(setIsSubmitEnabled(true));
      dispatch(setIsNameValid(true));
    } else {
      dispatch(setNicknameError('이미 사용중인 닉네임입니다. 다른 닉네임을 입력해주세요.'));
      dispatch(setIsNicknameChecked(false));
      dispatch(setIsSubmitEnabled(false));
      dispatch(setIsNameValid(false));
    }
  };

  const checkNicknameAvailability = async () => {
    const { data } = await checkNickname();
    if (data) {
      handleNicknameValidation(data.isAvailable);
    } 
  };

  useEffect(() => {
    if (nickname.length > 15) {
      dispatch(setNicknameError('닉네임은 15자 미만으로 입력해주세요.'));
      dispatch(setIsSubmitEnabled(false));
      dispatch(setIsNicknameChecked(false));
      dispatch(setIsNicknameCheckDisabled(true));
      dispatch(setIsNameValid(false));
    } else {
      dispatch(setNicknameError(''));
      dispatch(setIsNicknameCheckDisabled(false));
      dispatch(setIsSubmitEnabled(false));
      dispatch(setIsNameValid(false));
    }
  }, [nickname, dispatch]);

  return { checkNicknameAvailability };
};