import profileEditReducer from '@/entities/user/model/profileEditSlice';
import authReducer from '@/features/auth/model/authSlice';
import signupReducer from '@/features/sign-up/model/signupSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
    profileEdit: profileEditReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
