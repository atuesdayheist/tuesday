import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import curateSlice from './slices/curateSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    curate: curateSlice,
  },
});
