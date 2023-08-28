import { createSlice } from '@reduxjs/toolkit';

const sellerSlice = createSlice({
  name: 'sellers',
  initialState: [],
  reducers: {
    setSellers: (state, action) => action.payload,
  },
});

export const { setSellers } = sellerSlice.actions;
export default sellerSlice.reducer;
