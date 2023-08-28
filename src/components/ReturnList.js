import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setReturns } from '../slices/returnSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReturnList = () => {
  const dispatch = useDispatch();
  const returns = useSelector((state) => state.returns);
  const { invoiceId } = useParams();

  useEffect(() => {
    axios.get(`/api/returns/invoice/${invoiceId}`)
      .then((response) => {
        dispatch(setReturns(response.data));
      })
      .catch((error) => {
        console.error('Error fetching returns:', error);
      });
  }, [dispatch, invoiceId]);

  return (
    <div>
      <h2>Return List</h2>
      <ul>
        {returns.map((ret) => (
          <li key={ret.id}>{ret.returnId}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReturnList;
