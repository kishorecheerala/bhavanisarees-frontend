import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSeller } from './sellerSlice';

const AddSeller = () => {
    const dispatch = useDispatch();
    const [seller, setSeller] = useState({
        sellerName: '',
        sellerDetails: '',
        agentName: '',
        accountDetails: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSeller({
            ...seller,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addSeller(seller));

        // Clear the form fields
        setSeller({
            sellerName: '',
            sellerDetails: '',
            agentName: '',
            accountDetails: '',
        });
    };

    return (
        <div className="container mt-5">
            <h2>Add Seller</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="sellerName" className="form-label">
                        Seller Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="sellerName"
                        name="sellerName"
                        value={seller.sellerName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="sellerDetails" className="form-label">
                        Seller Details
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="sellerDetails"
                        name="sellerDetails"
                        value={seller.sellerDetails}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="agentName" className="form-label">
                        Agent Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="agentName"
                        name="agentName"
                        value={seller.agentName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="accountDetails" className="form-label">
                        Account Details
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="accountDetails"
                        name="accountDetails"
                        value={seller.accountDetails}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddSeller;
