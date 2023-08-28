import { createSlice } from '@reduxjs/toolkit';

const returnSlice = createSlice({
  name: 'returns',
  initialState: [],
  reducers: {
    setReturns: (state, action) => action.payload,
  },
});

export const { setReturns } = returnSlice.actions;
export default returnSlice.reducer;
