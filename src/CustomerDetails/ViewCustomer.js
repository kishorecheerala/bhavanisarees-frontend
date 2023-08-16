import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./ViewCustomer.css";

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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCustomers = async () => {
    const result = await axios.get(
      `http://localhost:8080/customer/${customerID}`
    );
    setCustomer(result.data);
  };

  const [purchaseData, setPurchaseData] = useState({
    customerID: {  },
    customerPurchaseDate: "",
    customerSareePrice: "",
    remarks: "",
    modeOfPayment: "",

    //item code and quantity
    purchasedSarees: [{ name: "", quantity: 1 }],

    //repayment radio button
    // 'purchased' or 'repayment'
    sareesOption: ["purchased", "repayment", "returns"],
    repaymentAmount: "",
    // Additional field for repayment
    returnedSarees: "", 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPurchaseData({ ...purchaseData, [name]: value, customerID:customer.customerID });
  };

  const handleSareeInputChange = (e, index) => {
    const newSarees = [...purchaseData.purchasedSarees];
    newSarees[index] = { ...newSarees[index], name: e.target.value };
    setPurchaseData({ ...purchaseData, purchasedSarees: newSarees });
  };

  const handleAddSaree = () => {
    setPurchaseData({
      ...purchaseData,
      purchasedSarees: [
        ...purchaseData.purchasedSarees,
        { name: "", quantity: 1 },
      ],
    });
  };

  const handleRemoveSaree = (index) => {
    const newSarees = [...purchaseData.purchasedSarees];
    newSarees.splice(index, 1);
    setPurchaseData({ ...purchaseData, purchasedSarees: newSarees });
  };

  const handleQuantityChange = (index, value) => {
    const newSarees = [...purchaseData.purchasedSarees];
    newSarees[index] = { ...newSarees[index], quantity: newSarees[index].quantity + value };
    if (newSarees[index].quantity < 1) {
      newSarees[index] = { ...newSarees[index], quantity: 1 };
    }
    setPurchaseData({ ...purchaseData, purchasedSarees: newSarees });
  };

  const handleSubmit = async (e) => {
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
  };

  return (
        // code for displaying details
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

                    {/* Radio button code for returns */}

                    <div className="form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sareesOption"
                        value="returns"
                        checked={purchaseData.sareesOption === "returns"}
                        onChange={handleInputChange}
                      />
                      <label id="purchase-label" className="form-check-label">
                        Returns
                      </label>
                    </div>
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
                      <div
                        className="form-floating"
                        id="add-saree-sub"
                        key={index}
                      >
                        <>
                          <input
                            id="saree-details"
                            type="text"
                            className="form-control"
                            value={saree.name}
                            onChange={(e) => handleSareeInputChange(e, index)}
                            required
                          />
                          <label for="saree-details" className="plabel">
                            Saree Details:
                          </label>
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
                          <div id="saree-quantity-btn-div">
                            <button
                              id="saree-decrement-btn"
                              className="btn btn-warning"
                              type="button"
                              onClick={() => handleQuantityChange(index, -1)}
                            >
                              -
                            </button>
                            <span id="saree-quantity">{saree.quantity}</span>
                            <button
                              id="saree-increment-btn"
                              className="btn btn-warning"
                              type="button"
                              onClick={() => handleQuantityChange(index, 1)}
                            >
                              +
                            </button>
                          </div>
                        </>
                      </div>
                    ))}

                    <div className="form-floating">
                      <input
                        id="saree-price"
                        type="number"
                        name="sareePrice"
                        className="form-control"
                        value={purchaseData.sareePrice}
                        onChange={handleInputChange}
                        required
                      />
                      <label for="saree-price" className="plabel">
                        Saree Price:
                      </label>
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

                {/* Radio buttons logic for returns */}

                {purchaseData.sareesOption === "returns" && (
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
                      <div
                      className="form-floating"
                      id="add-saree-sub"
                      key={index}
                    >
                      <>
                        <input
                          id="saree-details"
                          type="text"
                          className="form-control"
                          value={saree.name}
                          onChange={(e) => handleSareeInputChange(e, index)}
                          required
                        />
                        <label for="saree-details" className="plabel">
                          Saree Details:
                        </label>
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
                        <div id="saree-quantity-btn-div">
                          <button
                            id="saree-decrement-btn"
                            className="btn btn-warning"
                            type="button"
                            onClick={() => handleQuantityChange(index, -1)}
                          >
                            -
                          </button>
                          <span id="saree-quantity">{saree.quantity}</span>
                          <button
                            id="saree-increment-btn"
                            className="btn btn-warning"
                            type="button"
                            onClick={() => handleQuantityChange(index, 1)}
                          >
                            +
                          </button>
                        </div>
                      </>
                    </div>
                    ))}

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

                {/* End of Returns radio button logic */}

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
  );
}
