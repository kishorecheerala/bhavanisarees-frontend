import axios from 'axios';
import { setInvoices, addInvoice } from './invoiceSlice';

export const fetchInvoices = (sellerId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/invoices/seller/${sellerId}`);
        dispatch(setInvoices(response.data));
    } catch (error) {
        console.error('Error fetching invoices:', error);
    }
};

export const addInvoiceAsync = (newInvoice) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8080/api/invoices', newInvoice);
        dispatch(addInvoice(response.data));
    } catch (error) {
        console.error('Error adding invoice:', error);
    }
};
