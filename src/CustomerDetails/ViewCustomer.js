import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./ViewCustomer.css";

export default function ViewCustomer() {
  // let navigate=useNavigate();

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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCustomers = async () => {
    const result = await axios.get(
      `http://localhost:8080/customer/${customerID}`
    );
    setCustomer(result.data);
  };

  const [purchaseData, setPurchaseData] = useState({
    customerID: "",
    customerPurchaseDate: "",
    purchasedSarees: [],
    customerSareePrice: "",
    remarks: "",
    modeOfPayment: "",

    //repayment radio button fields
    sareesOption: "purchased", // 'purchased' or 'repayment'
    repaymentAmount: "", // Additional field for repayment
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPurchaseData({ ...purchaseData, [name]: value });
  };

  const handleSareeInputChange = (e, index) => {
    const newSarees = [...purchaseData.purchasedSarees];
    newSarees[index] = e.target.value;
    setPurchaseData({ ...purchaseData, purchasedSarees: newSarees });
  };

  const handleAddSaree = () => {
    setPurchaseData({
      ...purchaseData,
      purchasedSarees: [...purchaseData.purchasedSarees, ""],
    });
  };

  const handleRemoveSaree = (index) => {
    const newSarees = [...purchaseData.purchasedSarees];
    newSarees.splice(index, 1);
    setPurchaseData({ ...purchaseData, purchasedSarees: newSarees });
  };

  const handleSubmit = async (e) => {
    console.log(purchaseData);
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8080/customer/${customerID}/customerpurchase`,
        purchaseData
      );
      console.log("Purchase added successfully");
    } catch (error) {
      console.error("Error:", error);
    }
    // navigate("/");
  };

  return (
    // code for displaying details
    <div className="container-fluid">
      <div className="row">
        <div id="cd-div1" className="boarder rounded p-4 mt-5 shadow">
          <h1 id="cd-main-h2" className="text-center mb-3">
            Bhavani Sarees Payment Receipt
          </h1>
          <h2 id="cd-sub-h2" className="text-center mb-4">
            Customer Details
          </h2>

          <form onSubmit={handleSubmit}>
            <div id="customer-details" className="card">
              <table id="cd-table-pd" className="table">
                <thead id="cd-table-pd" className="table-dark">
                  <tr className="text-header">
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Address</th>
                    <th>Phone number</th>
                    <th>Reference</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {
                    <tr>
                      <td>{customer.customerID}</td>
                      <td>{customer.customerName}</td>
                      <td>{customer.address}</td>
                      <td>{customer.phoneNumber}</td>
                      <td>{customer.reference}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

            <div id="cd-card2-main" className="container-fluid">
              <div className="card-2">
                <h3 id="heading" className="text-center mb-3">
                  Payment Details
                </h3>
                <hr id="heading-hr"></hr>

                {/* Radio button code for customer purchase */}
                <div className="radio-btn-div">
                  <div className="form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sareesOption"
                      value="purchased"
                      checked={purchaseData.sareesOption === "purchased"}
                      onChange={handleInputChange}
                    />
                    <label id="purchase-label" className="form-check-label">
                      Purchased Sarees
                    </label>
                  </div>

                  {/* Radio button code for repayment */}

                  <div className="form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sareesOption"
                      value="repayment"
                      checked={purchaseData.sareesOption === "repayment"}
                      onChange={handleInputChange}
                    />
                    <label id="purchase-label" className="form-check-label">
                      Repayment
                    </label>
                  </div>
                </div>

                {/* Radio buttons logic */}

                {purchaseData.sareesOption === "purchased" && (
                  <>
                    <div id="saree-div">
                      <div>
                        <label id="saree-label">Saree Details:</label>
                      </div>
                      <div>
                        <button
                          id="add-saree-btn"
                          className="btn btn-warning"
                          type="button"
                          onClick={handleAddSaree}
                        >
                          Add Saree
                        </button>
                      </div>
                    </div>

                    {purchaseData.purchasedSarees.map((saree, index) => (
                      <div id="add-saree-sub" key={index}>
                        <>
                          <input
                            id="saree-details"
                            type="text"
                            value={saree}
                            onChange={(e) => handleSareeInputChange(e, index)}
                            required
                          />
                        </>
                        <>
                          <button
                            id="saree-remove-btn"
                            className="btn btn-danger m-1"
                            type="button"
                            onClick={() => handleRemoveSaree(index)}
                          >
                            Remove
                          </button>
                        </>
                      </div>
                    ))}

                    <div className="cd-card2-sub">
                      <label id="plabel" htmlFor="sareePrice">
                        Saree Price:
                      </label>
                      <input
                        id="cd-input"
                        type="number"
                        name="sareePrice"
                        value={purchaseData.sareePrice}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="cd-card2-sub">
                      <label id="plabel" htmlFor="purchaseDate">
                        Customer Purchase Date:
                      </label>
                      <input
                        id="date-input"
                        type="date"
                        name="customerPurchaseDate"
                        value={purchaseData.customerPurchaseDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </>
                )}

                {/* End of the customer purchase radio button */}

                {/* Start of repayment radio button */}

                {purchaseData.sareesOption === "repayment" && (
                  <>
                    <div className="cd-card2-sub">
                      <label id="plabel" htmlFor="purchaseDate">
                        Customer Repayment Date:
                      </label>
                      <input
                        id="date-input"
                        type="date"
                        name="customerPurchaseDate"
                        value={purchaseData.customerPurchaseDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <label id="plabel">Repayment Amount:</label>
                    <input
                      id="cd-input"
                      type="number"
                      name="repaymentAmount"
                      value={purchaseData.repaymentAmount}
                      onChange={handleInputChange}
                      required
                    />
                  </>
                )}

                {/* End of the repayment radio button */}

                <div className="cd-card2-sub">
                  <label id="plabel" htmlFor="remarks">
                    Remarks:
                  </label>
                  <input
                    id="cd-input"
                    type="text"
                    name="remarks"
                    value={purchaseData.remarks}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="cd-card2-sub">
                  <label id="plabel" htmlFor="customerID">
                    Customer ID:
                  </label>
                  <input
                    id="cd-input"
                    type="text"
                    name="customerID"
                    value={purchaseData.customerID}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="cd-card2-sub">
                  <label id="plabel" htmlFor="Name" className="from-label">
                    Mode of Payment:
                  </label>
                  <select
                    id="cd-input"
                    className="form-select"
                    name="modeOfPayment"
                    value={purchaseData.modeOfPayment}
                    onChange={handleInputChange}
                    required
                  >
                    <option selected>Mode of Payment: </option>
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Account Transfer">Account Transfer</option>
                  </select>
                </div>

                {/* <div id="payment-upload" className="input-group mb-3">
                    <input id="payment-upload-input" type="file" className="form-control"></input>
                    <label id='payment-upload-label' className="input-group-text" for="payment-upload-label">Upload</label>
                    </div> */}
              </div>

              <div id="cd-div-3" className="card-3">
                <b>Previous Balance Details</b>
              </div>
            </div>

            {/* End of Primary div */}

    

            <div id="cd-buttons">
              <br></br>
              <button
                id="cd-submit-btn"
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
              <Link
                id="cd-cancel-btn"
                className="btn btn-danger mx-2"
                to="/customers"
              >
                Cancel
              </Link>
              <br></br>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
