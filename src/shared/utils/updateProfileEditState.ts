import { AppDispatch } from '@/app/store';
import {
  setNicknameError,
  setIsNicknameChecked,
  setIsSubmitEnabled,
  setIsNicknameCheckDisabled
} from '@/entities/user/model/profileEditSlice';

export const updateProfileEditState = (
  dispatch: AppDispatch,
  updates: Partial<{
    nicknameError: string;
    isNicknameChecked: boolean;
    isSubmitEnabled: boolean;
    isNicknameCheckDisabled: boolean;
  }>
) => {
  if ('nicknameError' in updates)
    dispatch(setNicknameError(updates.nicknameError || ''));
  if ('isNicknameChecked' in updates)
    dispatch(setIsNicknameChecked(updates.isNicknameChecked || false));
  if ('isSubmitEnabled' in updates)
    dispatch(setIsSubmitEnabled(updates.isSubmitEnabled || false));
  if ('isNicknameCheckDisabled' in updates)
    dispatch(
      setIsNicknameCheckDisabled(updates.isNicknameCheckDisabled || false)
    );
};
