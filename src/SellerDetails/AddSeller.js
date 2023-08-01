import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import '../SellerDetails/AddSeller.css';

export default function AddCustomer() {

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
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center mb-4'>Add a New Customer</h2>
                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className='m-2'>
                            <label htmlFor='Name' className='from-label m-2'>
                                Customer ID:
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter Customer ID'
                                name='customerID'
                                value={customerID}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='m-2'>
                            <label htmlFor='Name' className='from-label m-2'>
                                Name:
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter Customer Name '
                                name='customerName'
                                value={customerName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='m-2'>
                            <label htmlFor='Name' className='from-label m-2'>
                                Address:
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Customer Address'
                                name='address'
                                value={address}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='m-2'>
                            <label htmlFor='Name' className='from-label m-2'>
                                PhoneNo:
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Phone Number'
                                name='phoneNumber'
                                value={phoneNumber}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='m-2'>
                            <label htmlFor='Name' className='from-label m-2'>
                                Reference:
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Reference'
                                name='reference'
                                value={reference}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div><br></br>

                        <button type='submit' className='btn btn-outline-primary'>Submit</button>
                        <Link className='btn btn-outline-danger mx-2' to="/customers" >Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
