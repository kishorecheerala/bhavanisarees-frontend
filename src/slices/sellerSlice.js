import { createSlice } from '@reduxjs/toolkit';

export const sellerSlice = createSlice({
  name: 'seller',
  initialState: {
    sellers: [],
  },
  reducers: {
    setSellers: (state, action) => {
      state.sellers = action.payload;
    },
    addSeller: (state, action) => {
      state.sellers.push(action.payload);
    },
  },
});

export const { setSellers, addSeller } = sellerSlice.actions;
export const selectSellers = (state) => state.seller.sellers;

export default sellerSlice.reducer;