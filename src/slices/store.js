import { configureStore } from '@reduxjs/toolkit';
import sellerReducer from './slices/sellerSlice';
import invoiceReducer from './slices/invoiceSlice';
import repaymentReducer from './slices/repaymentSlice';
import invoiceItemReducer from './slices/invoiceItemSlice';
import returnReducer from './slices/returnSlice';

const store = configureStore({
  reducer: {
    sellers: sellerReducer,
    invoices: invoiceReducer,
    repayments: repaymentReducer,
    invoiceItems: invoiceItemReducer,
    returns: returnReducer,
  },
});

export default store;
