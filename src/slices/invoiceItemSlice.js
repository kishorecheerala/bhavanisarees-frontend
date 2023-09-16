import { createSlice } from '@reduxjs/toolkit';

export const invoiceItemSlice = createSlice({
name: 'invoiceItem',
initialState: {
    items: [], // Initial state for invoice items
},
reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload); // Add a new item to the items array
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload); // Remove an item by id
    },
    // Add other reducers as needed for updating invoice items
},
});

export const { addItem, removeItem } = invoiceItemSlice.actions; // Export action creators

export const selectInvoiceItems = state => state.invoiceItem.items; // Selector to get invoice items

export default invoiceItemSlice.reducer; // Export the reducer
