import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSellers, addSeller as addSellerToRedux, selectSellers } from '../slices/sellerSlice';
import axios from 'axios';


import { useNavigate } from 'react-router-dom'; // <-- Step 1: Import useNavigate



import "./SellerList.css"

const SellerList = () => {
  const dispatch = useDispatch();
  const sellers = useSelector(selectSellers);
  const navigate = useNavigate(); // <-- Step 2: Initialize navigate


  const [newSeller, setNewSeller] = useState({
    sellerName: '',
    sellerDetails: '',
    agentName: '',
    accountDetails: '',
  });

  const handleSellerClick = (seller) => {
    navigate(`/invoices/seller/${seller.id}`); // <-- Step 3: Use navigate to redirect
  };

  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    async function fetchSellers() {
      try {
        const response = await axios.get('http://localhost:8080/api/sellers');
        dispatch(setSellers(response.data));
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    }

    fetchSellers();
  }, [dispatch]);

  const onInputChange = (e) => {
    setNewSeller({
      ...newSeller,
      [e.target.name]: e.target.value
    });
  };

  const clearFields = () => {
    setNewSeller({
      sellerID: '',
      sellerName: '',
      sellerDetails: '',
      agentName: '',
      accountDetails: '',
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/sellers', newSeller);

      // Dispatch action to update Redux store
      dispatch(addSellerToRedux(response.data));

      // Clear form fields
      clearFields();

      // Hide the form after submission
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error adding seller:', error);
    }
  };

  return (
    <div className="container mt-4">
      <button id='add-seller-show-hide-btn'
        className={`btn ${isFormVisible ? 'btn-danger' : 'btn-success'}`}
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? 'Hide Add Seller Form' : 'Show Add Seller Form'}
      </button>

      {isFormVisible && (
        <div className="container mt-4 mb-4 border rounded shadow">
          <h2 className='text-center m-3'>Add a New Seller</h2>

          <form onSubmit={onSubmit}>
            {/* <div className="mb-3">
              <label htmlFor="sellerID" className="form-label">Seller ID:</label>
              <input
                type="text"
                className="form-control"
                id="sellerID"
                name="sellerID"
                value={newSeller.sellerID}
                onChange={onInputChange}
                required
              />
            </div> */}

            <div className="mb-3">
              <label htmlFor="sellerName" className="form-label">Seller Name:</label>
              <input
                type="text"
                className="form-control"
                id="sellerName"
                name="sellerName"
                value={newSeller.sellerName}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="sellerDetails" className="form-label">Seller Details:</label>
              <input
                type="text"
                className="form-control"
                id="sellerDetails"
                name="sellerDetails"
                value={newSeller.sellerDetails}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="agentName" className="form-label">Agent Name:</label>
              <input
                type="text"
                className="form-control"
                id="agentName"
                name="agentName"
                value={newSeller.agentName}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="accountDetails" className="form-label">Account Details:</label>
              <input
                type="text"
                className="form-control"
                id="accountDetails"
                name="accountDetails"
                value={newSeller.accountDetails}
                onChange={onInputChange}
                required
              />
            </div>
            <div className='add-seller-btn-div'>
              <button type="submit" className="btn btn-primary mb-4">Submit</button>
              <button type="button" className="btn btn-danger mb-4" onClick={clearFields}>Reset</button>
            </div>
          </form>
        </div>
      )}


      <div id='seller-list-table-div' className='container border rounded shadow mt-2'>
        <h2 className='text-center m-2'>Seller List</h2>
        <table id='seller-list-table' className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">Seller ID</th>
              <th scope="col">Seller Name</th>
              <th scope="col">Seller Details</th>
              <th scope="col">Agent Name</th>
              <th scope="col">Account Details</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller.id}>
                <td>{seller.id}</td>
                <td id='seller-name' className='fw-bold'>
                  <span
                    key={seller.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSellerClick(seller)}
                  >
                    {seller.sellerName}
                  </span>
                </td>
                <td>{seller.sellerDetails}</td>
                <td>{seller.agentName}</td>
                <td>{seller.accountDetails}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerList;
