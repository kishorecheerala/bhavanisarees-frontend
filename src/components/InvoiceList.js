import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInvoices, addInvoiceAsync } from '../slices/invoiceSlice';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './InvoiceList.css';

const InvoiceList = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices);
  const { sellerId } = useParams();

  const [showAddInvoice, setShowAddInvoice] = useState(false);

  const toggleAddInvoice = () => {
    setShowAddInvoice((prev) => !prev);
  };

  const [newInvoice, setNewInvoice] = useState({
    // Initialize with default values or leave empty based on your requirements
    invoiceNumber: '',
    invoiceDate: '',
    invoiceAmount: 0,
    repaymentAmount: 0,
    pendingAmount: 0,
    repaymentStatus: '',
    id: Number(sellerId), // Assuming you have the sellerId available
  });

  const onInputChange = (e) => {
    setNewInvoice({
      ...newInvoice,
      [e.target.name]: e.target.value,
    });
  };

  const clearFields = () => {
    setNewInvoice({
      invoiceNumber: '',
      invoiceDate: '',
      invoiceAmount: 0,
      repaymentAmount: 0,
      pendingAmount: 0,
      repaymentStatus: '',
      sellerId: sellerId, // Reset sellerId if needed
    });
  };

  const handleAddInvoice = async () => {
    try {
      console.log("New Invoice:", newInvoice); // Log the newInvoice object
      const response = await axios.post('http://localhost:8080/api/invoices', newInvoice);
      dispatch(addInvoiceAsync(response.data));
      clearFields();
    } catch (error) {
      console.error('Error adding invoice:', error);
    }
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/invoices/seller/${sellerId}`);
        dispatch(setInvoices(response.data));
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, [dispatch, sellerId]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Invoice List</h2>


      <div className="mb-4">
        <button className="btn btn-primary" onClick={toggleAddInvoice}>
          {showAddInvoice ? 'Hide Add Invoice' : 'Show Add Invoice'}
        </button>
        <Link type="button" className='btn btn-secondary m-1'
        to={`/sellers`}
        >
        Back to Seller Details
        </Link>

        {showAddInvoice && (
          <div>
            <h2>Add Invoice</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="invoiceNumber" className="form-label">Invoice Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="invoiceNumber"
                  name="invoiceNumber"
                  value={newInvoice.invoiceNumber}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="invoiceDate" className="form-label">Invoice Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="invoiceDate"
                  name="invoiceDate"
                  value={newInvoice.invoiceDate}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="invoiceAmount" className="form-label">Invoice Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="invoiceAmount"
                  name="invoiceAmount"
                  value={newInvoice.invoiceAmount}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="repaymentAmount" className="form-label">Repayment Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="repaymentAmount"
                  name="repaymentAmount"
                  value={newInvoice.repaymentAmount}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pendingAmount" className="form-label">Pending Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="pendingAmount"
                  name="pendingAmount"
                  value={newInvoice.pendingAmount}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="repaymentStatus" className="form-label">Repayment Status</label>
                <input
                  type="text"
                  className="form-control"
                  id="repaymentStatus"
                  name="repaymentStatus"
                  value={newInvoice.repaymentStatus}
                  onChange={onInputChange}
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={handleAddInvoice}>
                Add Invoice
              </button>
            </form>
          </div>
        )}
      </div>

      <div>
        {invoices.length === 0 ? (
          <div id='no-invoice-div' className="alert alert-info text-center">No invoices for this seller</div>
        ) : (
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Invoice Number</th>
                <th>Invoice Date</th>
                <th>Invoice Amount</th>
                <th>Repayment Amount</th>
                <th>Pending Amount</th>
                <th>Repayment Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => {
                const formattedDate = new Date(invoice.invoiceDate)
                  .toLocaleDateString('en-GB')
                  .split('/')
                  .join('-');

                return (
                  <tr key={invoice.id}>
                    <td>{invoice.id}</td>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{formattedDate}</td>
                    <td>{invoice.invoiceAmount}</td>
                    <td>{invoice.repaymentAmount}</td>
                    <td>{invoice.pendingAmount}</td>
                    <td>{invoice.repaymentStatus}</td>
                  </tr>
                );
                })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default InvoiceList;
