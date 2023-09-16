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
        // Additional actions like removeInvoice, updateInvoice can be added here
    },
});

export const { setInvoices, addInvoice } = invoiceSlice.actions;
export const selectInvoices = (state) => state.invoices;
export default invoiceSlice.reducer;
