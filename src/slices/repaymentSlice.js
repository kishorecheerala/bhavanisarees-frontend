import { createSlice } from '@reduxjs/toolkit';

const repaymentSlice = createSlice({
  name: 'repayments',
  initialState: [],
  reducers: {
    setRepayments: (state, action) => action.payload,
  },
});

export const { setRepayments } = repaymentSlice.actions;
export default repaymentSlice.reducer;
