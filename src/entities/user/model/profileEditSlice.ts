import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProfileEditState {
  nicknameError: string | null;
  isNicknameChecked: boolean;
  isSubmitEnabled: boolean;
  isNicknameCheckDisabled: boolean;
}

const initialState: ProfileEditState = {
  nicknameError: null,
  isNicknameChecked: false,
  isSubmitEnabled: false,
  isNicknameCheckDisabled: false
};

export const profileEditSlice = createSlice({
  name: 'profileEdit',
  initialState,
  reducers: {
    setNicknameError: (state, action: PayloadAction<string | null>) => {
      state.nicknameError = action.payload;
    },
    setIsNicknameChecked: (state, action: PayloadAction<boolean>) => {
      state.isNicknameChecked = action.payload;
    },
    setIsSubmitEnabled: (state, action: PayloadAction<boolean>) => {
      state.isSubmitEnabled = action.payload;
    },
    setIsNicknameCheckDisabled: (state, action: PayloadAction<boolean>) => {
      state.isNicknameCheckDisabled = action.payload;
    }
  }
});

export const {
  setNicknameError,
  setIsNicknameChecked,
  setIsSubmitEnabled,
  setIsNicknameCheckDisabled
} = profileEditSlice.actions;

export default profileEditSlice.reducer;
