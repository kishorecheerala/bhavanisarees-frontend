import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import '../SellerDetails/ViewSeller.css';

export default function ViewCustomer() {
  const [customer, setCustomer] = useState({
    customerID: "",
    customerName: "",
    address: "",
    phoneNumber: "",
    reference: "",
  });

  const { customerID } = useParams();

  useEffect(() => {
    loadCustomers();
  });

  const loadCustomers = async () => {
    const result = await axios.get(
      `http://localhost:8080/customer/${customerID}`
    );
    setCustomer(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 boarder rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Customer Details</h2>

          <div className="card">
            <div className="card-header">
              <b>Details of the User By ID: {customer.customerID}</b>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Customer Name: {customer.customerName}</b>
                </li>
                <li className="list-group-item">
                  <b>Customer Address: {customer.address}</b>
                </li>
                <li className="list-group-item">
                  <b>Customer Phone Number:{customer.phoneNumber} </b>
                </li>
                <li className="list-group-item">
                  <b>Reference: {customer.reference}</b>
                </li>
              </ul>
            </div>
          </div>

          <Link className="btn btn-primary my-2" to={"/customers"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
