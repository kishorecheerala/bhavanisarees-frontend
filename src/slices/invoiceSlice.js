import { createSlice } from '@reduxjs/toolkit';

export const invoiceSlice = createSlice({
  name: 'invoices',
  initialState: [],
  reducers: {
    setInvoices: (state, action) => {
      return action.payload;
    },
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setInvoices, addInvoice } = invoiceSlice.actions;

export const addInvoiceAsync = (invoice) => (dispatch) => {
  dispatch(addInvoice(invoice));
};

export const selectInvoices = (state) => state.invoices;

export default invoiceSlice.reducer;
