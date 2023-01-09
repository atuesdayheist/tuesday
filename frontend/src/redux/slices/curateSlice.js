import { createSlice } from '@reduxjs/toolkit';

export const curateSlice = createSlice({
  name: 'curate',
  initialState: { previewImages: [] },
  reducers: {
    setPreview: (state, action) => {
      state.previewImages = [
        ...state.previewImages,
        ...action.payload,
      ];
    },
  },
});

export const { setPreview } = curateSlice.actions;

export default curateSlice.reducer;
