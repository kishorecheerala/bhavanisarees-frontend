import { createSlice } from '@reduxjs/toolkit';

const invoiceItemSlice = createSlice({
  name: 'invoiceItems',
  initialState: [],
  reducers: {
    setInvoiceItems: (state, action) => action.payload,
  },
});

export const { setInvoiceItems } = invoiceItemSlice.actions;
export default invoiceItemSlice.reducer;
