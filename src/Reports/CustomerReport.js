import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import "./CustomerReport.css";


const CustomerReport = () => {
  const [newcustomers, setNewCustomers] = useState([]);

  //eslint-disable-next-line
  const { customerID } = useParams();

  useEffect(() => {
    loadNewCustomers();
  }, []);

  const loadNewCustomers = async () => {
    const result = await axios.get("http://localhost:8080/customers");
    setNewCustomers(result.data);
  };

  const deleteUser = async (customerID) => {
    await axios.delete(`http://localhost:8080/customer/${customerID}`);
    loadNewCustomers();
  };


  return (

    <div className="container">
      <h1 id="lc-h1" className="text-center">
        Customers List
      </h1>
      <br></br>
      <div id='list-customer-div'>
        <table id='list-customer-table' className="table table-bordered shadow">
          <thead id="lc-table" className="table-dark">
            <tr className="text-header m-1">
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Phone number</th>
              <th>Reference</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody id="lc-table" className="table-body">
            {newcustomers.map((customers) => (
              <tr key={customers.customersID}>
                <td>{customers.customerID}</td>
                <td>{customers.customerName}</td>
                <td>{customers.address}</td>
                <td>{customers.phoneNumber}</td>
                <td>{customers.reference}</td>
                <td className="actions">
                  <Link
                    id='list-customers-btn-view'
                    type="button"
                    className="btn btn-primary mx-2"
                    to={`/viewcustomer/${customers.customerID}`}
                  >
                    View
                  </Link>
                  <Link
                    id='list-customers-btn-edit'
                    className="btn btn-outline-primary mx-2"
                    to={`/editcustomer/${customers.customerID}`}
                  >
                    Edit
                  </Link>
                  <button
                    id='list-customers-btn-delete'
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(customers.customerID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerReport;
