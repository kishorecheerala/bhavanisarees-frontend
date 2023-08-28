import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInvoiceItems } from '../features/invoiceItemSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InvoiceDetail = () => {
  const dispatch = useDispatch();
  const invoiceItems = useSelector((state) => state.invoiceItems);
  const { invoiceId } = useParams();

  useEffect(() => {
    axios.get(`/api/invoiceItems/invoice/${invoiceId}`)
      .then((response) => {
        dispatch(setInvoiceItems(response.data));
      })
      .catch((error) => {
        console.error('Error fetching invoice items:', error);
      });
  }, [dispatch, invoiceId]);

  return (
    <div>
      <h2>Invoice Detail</h2>
      <ul>
        {invoiceItems.map((item) => (
          <li key={item.id}>{item.itemDescription}</li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceDetail;
