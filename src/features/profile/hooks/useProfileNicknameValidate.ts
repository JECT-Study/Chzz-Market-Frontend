import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  setNicknameError,
  setIsNicknameChecked,
  setIsSubmitEnabled,
  setIsNicknameCheckDisabled
} from '@/entities/user/model/profileEditSlice';
import { useCheckNickname } from '@/features/profile/model';

interface UseNicknameProps {
  nickname: string;
  originalNickname: string;
}

export const useProfileNicknameValidate = ({
  nickname,
  originalNickname
}: UseNicknameProps) => {
  const dispatch = useDispatch();
  const { checkNickname } = useCheckNickname({ nickname });

  const handleNicknameValidation = (isAvailable: boolean) => {
    if (!nickname || nickname === '') {
      dispatch(setNicknameError('닉네임을 입력해주세요.'));
      dispatch(setIsNicknameChecked(false));
      dispatch(setIsSubmitEnabled(false));
    } else if (isAvailable) {
      dispatch(setNicknameError('사용 가능한 닉네임입니다.'));
      dispatch(setIsNicknameChecked(true));
      dispatch(setIsSubmitEnabled(true));
    } else {
      dispatch(
        setNicknameError(
          '이미 사용중인 닉네임입니다. 다른 닉네임을 입력해주세요.'
        )
      );
      dispatch(setIsNicknameChecked(false));
      dispatch(setIsSubmitEnabled(false));
    }
  };

  const checkNicknameAvailability = async () => {
    if (nickname === originalNickname) {
      dispatch(setNicknameError('기존 닉네임입니다. 사용가능합니다.'));
      dispatch(setIsNicknameChecked(true));
      dispatch(setIsSubmitEnabled(true));
      return;
    }

    const { data } = await checkNickname();
    handleNicknameValidation(data.isAvailable);
  };

  useEffect(() => {
    if (!nickname.trim()) {
      dispatch(setNicknameError('닉네임을 입력해주세요.'));
      dispatch(setIsSubmitEnabled(false));
      dispatch(setIsNicknameChecked(false));
      dispatch(setIsNicknameCheckDisabled(true));
      return;
    }

    if (nickname.length > 15) {
      dispatch(setNicknameError('닉네임은 15자 미만으로 입력해주세요.'));
      dispatch(setIsSubmitEnabled(false));
      dispatch(setIsNicknameChecked(false));
      dispatch(setIsNicknameCheckDisabled(true));
    } else {
      dispatch(setNicknameError(''));
      dispatch(setIsNicknameCheckDisabled(false));
      if (nickname === originalNickname) {
        dispatch(setIsSubmitEnabled(true));
      } else {
        dispatch(setIsSubmitEnabled(false));
      }
    }
  }, [nickname, originalNickname, dispatch]);

  return { checkNicknameAvailability };
};
