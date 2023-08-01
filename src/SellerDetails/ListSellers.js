import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";

import '../SellerDetails/ListSellers.css';

const ListNewCustomers = () => {

    const [newcustomers, setNewCustomers] = useState([])

    //eslint-disable-next-line 
    const {customerID} =useParams();
    

    useEffect(() =>{
      loadNewCustomers();
    }, [] );

    const loadNewCustomers=async()=>{
      const result=await axios.get("http://localhost:8080/customers");
      setNewCustomers(result.data);
    }

    const deleteUser = async (customerID) =>{
      await axios.delete(`http://localhost:8080/customer/${customerID}`);
      loadNewCustomers();
    }

    return (
    <div className='container'>
      <h2 className='text-center'>Customers List</h2>
      <br></br>
      <table className='table table-bordered shadow'>
        <thead className='table-dark'>
          <tr className='text-header m-1'>
          <th>Customer ID</th>
          <th>Customer Name</th>
          <th>Address</th>
          <th>Phone number</th>
          <th>Reference</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {
            newcustomers.map(customers =>
              <tr key={customers.customersID}>
                <td>{customers.customerID}</td>
                <td>{customers.customerName}</td>
                <td>{customers.address}</td>
                <td>{customers.phoneNumber}</td>
                <td>{customers.reference}</td>
                <td className='actions'>
                  <Link className="btn btn-primary mx-1" to={`/customers/${customers.customerID}`}>View</Link>
                  <Link className="btn btn-outline-primary mx-1" 
                  to={`/editcustomer/${customers.customerID}`}
                  >Edit
                  </Link>
                  <button className="btn btn-danger mx-1"
                  onClick={()=>deleteUser(customers.customerID)}
                  >Delete</button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>

    </div>
  );
}

export default ListNewCustomers;