import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';

import '../SellerDetails/EditSeller.css';

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
    <div className='container'>
        <div className='row'>
            <div className='col-md-9 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Edit Customer Details</h2>
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
                    onChange={(e)=>onInputChange(e)}
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
                    onChange={(e)=>onInputChange(e)}
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
                    onChange={(e)=>onInputChange(e)}
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
                    onChange={(e)=>onInputChange(e)}
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
                    onChange={(e)=>onInputChange(e)}
                    />
                    </div>

            <button type='submit' className='btn btn-outline-primary'>Submit</button>
            <Link className='btn btn-outline-danger mx-2'to="/customers" >Cancel</Link>
            </form>
            </div>
        </div>
    </div>
  )
}
