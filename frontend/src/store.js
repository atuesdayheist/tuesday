import { configureStore } from '@reduxjs/toolkit';
import authSlice from './services/auth/authSlice';
import curateSlice from './services/curate/curateSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    curate: curateSlice,
  },
});
