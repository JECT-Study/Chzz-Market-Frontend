import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import signupReducer from './signupSlice';
import profileEditReducer from './profileEditSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
    profileEdit: profileEditReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
