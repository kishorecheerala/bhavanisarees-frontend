import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import '../SellerDetails/AddSeller.css';

export default function AddSeller() {

    let navigate = useNavigate();

    const [customer, setCustomer] = useState({
        customerID: "",
        customerName: "",
        address: "",
        phoneNumber: "",
        reference: ""
    });

    const { customerID, customerName, address, phoneNumber, reference } = customer;

    const onInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/newcustomer", customer);
        navigate("/customers");
    };

    return (
        <div className='add-customer-container'>
            <div className='row'>
                <div id='add-customer-maincard' className='border rounded shadow'>
                    <h2 id='add-customer-h2' className='m-4 text-center'>Add a New Customer</h2>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className='form-floating'>

                            <input
                                id='add-customer-input'
                                type={"text"}
                                className='form-control'
                                placeholder='Enter Customer ID'
                                name='customerID'
                                value={customerID}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                            <label for='add-customer-input' className='add-customer-label'>
                                Customer ID:
                            </label>
                        </div>


                        <div className='form-floating'>
                            <input
                                id='add-customer-input'
                                type={"text"}
                                className='form-control'
                                placeholder='Enter Customer Name '
                                name='customerName'
                                value={customerName}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                            <label for='add-customer-input' className='add-customer-label'>
                                Name:
                            </label>
                        </div>

                        <div className='form-floating'>

                            <input
                                id='add-customer-input'
                                type={"text"}
                                className='form-control'
                                placeholder='Customer Address'
                                name='address'
                                value={address}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                            <label for='add-customer-input' className='add-customer-label'>
                                Address:
                            </label>
                        </div>

                        <div className='form-floating'>

                            <input
                                id='add-customer-input'
                                type={"text"}
                                className='form-control'
                                placeholder='Phone Number'
                                name='phoneNumber'
                                value={phoneNumber}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                            <label for='add-customer-input' className='add-customer-label'>
                                Phone No:
                            </label>
                        </div>

                        <div className='form-floating'>

                            <input
                                id='add-customer-input'
                                type={"text"}
                                className='form-control'
                                placeholder='Reference'
                                name='reference'
                                value={reference}
                                onChange={(e) => onInputChange(e)}
                                required
                            />

                            <label for='add-customer-input' className='add-customer-label'>
                                Reference
                            </label>
                        </div><br></br>

                        <div id='add-customer-btn-div'>
                            <button id='add-customer-submit-btn' type='submit' className='btn btn-primary'>Submit</button>
                            <Link id='add-customer-submit-btn' className='btn btn-danger' to="/customers" >Cancel</Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
