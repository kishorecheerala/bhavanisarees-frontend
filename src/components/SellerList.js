import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSellers } from '../slices/sellerSlice';
import axios from 'axios';

const SellerList = () => {
  const dispatch = useDispatch();
  const sellers = useSelector((state) => state.sellers);

  useEffect(() => {
    axios.get('/api/sellers')
      .then((response) => {
        dispatch(setSellers(response.data));
      })
      .catch((error) => {
        console.error('Error fetching sellers:', error);
      });
  }, [dispatch]);

  return (
    <div>
      <h2>Seller List</h2>
      <ul>
        {sellers.map((seller) => (
          <li key={seller.id}>{seller.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SellerList;
