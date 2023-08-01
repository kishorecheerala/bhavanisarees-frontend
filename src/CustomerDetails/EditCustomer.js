import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

import './EditCustomer.css';

export default function EditCustomer() {

    let navigate=useNavigate(); 

    const{customerID} =useParams();

    const[customer, setCustomer]=useState({
        customerID:"",
        customerName:"",
        address: "",
        phoneNumber:"",
        reference:""
    });

    const{customerName, address, phoneNumber, reference}=customer;


    const onInputChange=(e)=>{
        setCustomer({...customer,[e.target.name]:e.target.value});
    };

    useEffect(()=>{
        loadCustomers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onSubmit=async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/customer/${customerID}`,customer);
        navigate("/customers");
    };

    const loadCustomers = async () =>{
        const result=await axios.get(`http://localhost:8080/customer/${customerID}`)
        setCustomer(result.data)
    };

return (
            <div id='edit-customer-container'>
            <div id='edit-customer-maincard' className='border rounded shadow'>
                <h2 id='edit-customer-h2' className='text-center m-4'>Edit Customer Details</h2>
                    <form onSubmit={(e) => onSubmit(e)}>

                    <div className='edit-customer-subdivs'>
                    <label id='edit-customer-label' htmlFor='Name' className='from-label'>
                    Customer ID:
                    </label>
                    <input
                    id='edit-customer-input'
                    type={"text"}
                    className='form-control'
                    placeholder='Enter Customer ID'
                    name='customerID'
                    value={customerID}
                    onChange={(e)=>onInputChange(e)}
                    />
                    </div>

                    <div className='edit-customer-subdivs'>
                    <label id='edit-customer-label' htmlFor='Name' className='from-label'>
                    Name :
                    </label>
                    <input
                    id='edit-customer-input'
                    type={"text"}
                    className='form-control'
                    placeholder='Enter Customer Name '
                    name='customerName'
                    value={customerName}
                    onChange={(e)=>onInputChange(e)}
                    />
                    </div>

                    <div className='edit-customer-subdivs'>
                    <label id='edit-customer-label' htmlFor='Name' className='from-label'>
                    Address: 
                    </label>
                    <input
                    id='edit-customer-input'
                    type={"text"}
                    className='form-control'
                    placeholder='Customer Address'
                    name='address'
                    value={address}
                    onChange={(e)=>onInputChange(e)}
                    />
                    </div>
                    
                    <div className='edit-customer-subdivs'>
                    <label id='edit-customer-label' htmlFor='Name' className='from-label'>
                    PhoneNo: 
                    </label>
                    <input
                    id='edit-customer-input'
                    type={"text"}
                    className='form-control'
                    placeholder='Phone Number'
                    name='phoneNumber'
                    value={phoneNumber}
                    onChange={(e)=>onInputChange(e)}
                    />
                    </div>
                    
                    <div className='edit-customer-subdivs'>
                    <label id='edit-customer-label' htmlFor='Name' className='from-label'>
                    Reference:
                    </label>
                    <input
                    id='edit-customer-input'
                    type={"text"}
                    className='form-control'
                    placeholder='Reference'
                    name='reference'
                    value={reference}
                    onChange={(e)=>onInputChange(e)}
                    />
                    </div>

                    {/* End of the sub card */}
                <div id='edit-customer-btn-div'>
            <br></br>
            <button id='edit-customer-submit-btn' type='submit' className='btn btn-primary'>Submit</button>
            <Link id='edit-customer-cancel-btn' className='btn btn-danger' to="/customers" >Cancel</Link>
            </div>
            <br></br>
        </form>
    </div>
</div>
)
}
