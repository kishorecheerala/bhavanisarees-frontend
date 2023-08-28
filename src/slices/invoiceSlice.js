import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setInvoices: (state, action) => action.payload,
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex(invoice => invoice.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteInvoice: (state, action) => {
      const index = state.findIndex(invoice => invoice.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const {
  setInvoices,
  addInvoice,
  updateInvoice,
  deleteInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
