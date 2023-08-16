import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

import "./CustomerDetails.css";
import "./CustomerDetails.scss";


import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables.min.js";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.min.js";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import "datatables.net-buttons/js/buttons.colVis.min.js";
import $ from "jquery";

// Import to display the pdf button vfs_fonts.js
// eslint-disable-next-line no-unused-vars
import pdfMake from "pdfmake/build/pdfmake";
// Import vfs_fonts.js module

// eslint-disable-next-line no-unused-vars
import pdfFonts from "pdfmake/build/vfs_fonts";

//importing Toast notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Assign vfs_fonts.js module to pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CustomerDetails = () => {
  // Code to hide the Add Customer Div
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);

  //Edit customer
  const [editMode, setEditMode] = useState(false);

  // State to hold the customer data for editing
  const [editCustomerData, setEditCustomerData] = useState({
    customerID: "",
    customerName: "",
    address: "",
    phoneNumber: "",
    reference: "",
  });


  //Delete button Model box confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const [newcustomers, setNewCustomers] = useState([]);

  const [customer, setCustomer] = useState({
    customerID: "",
    customerName: "",
    address: "",
    phoneNumber: "",
    reference: "",
  });

  const { customerID, customerName, address, phoneNumber, reference } =
    customer;

  const onInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const onEditInputChange = (e) => {
    setEditCustomerData({
      ...editCustomerData,
      [e.target.name]: e.target.value,
    });
  };

  const reloadTable = async () => {
    await loadNewCustomers();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/newcustomer", customer);
    toast.success("Added customer successfully"); // Show success toast
    // navigate("/customers");
    reloadTable(); // Reload the table after submitting
    clearFields(); // Clear input fields
  };

  const loadNewCustomers = async () => {
    const result = await axios.get("http://localhost:8080/customers");
    setNewCustomers(result.data);
  };

  //Edit customer code to display the values and update
  const onEditClick = (customerID) => {
    const customerToEdit = newcustomers.find(
      (customer) => customer.customerID === customerID
    );
    if (customerToEdit) {
      setEditMode(true);
      setEditCustomerData({
        customerID: customerToEdit.customerID,
        customerName: customerToEdit.customerName,
        address: customerToEdit.address,
        phoneNumber: customerToEdit.phoneNumber,
        reference: customerToEdit.reference,
      });
    }
  };

  const onEditSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:8080/customer/${editCustomerData.customerID}`,
      editCustomerData
    );
    toast.success("Edited customer successfully");
    loadNewCustomers();
    setEditMode(false);
  };


  const handleShowConfirmation = (customerID) => {
    setShowConfirmation(true);
    setCustomerToDelete(customerID);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setCustomerToDelete(null);
  };

  const confirmDelete = async (customerID) => {
    if (customerToDelete) {
      await axios.delete(`http://localhost:8080/customer/${customerID}`);
      toast.success("Deleted customer successfully");
      loadNewCustomers();
      handleCloseConfirmation();
    }
  };

  const clearFields = () => {
    setCustomer({
      customerID: "",
      customerName: "",
      address: "",
      phoneNumber: "",
      reference: "",
    });
  };

  useEffect(() => {
    loadNewCustomers();
  }, []);

  //initialize datatable
  $(document).ready(function () {
    setTimeout(function () {
      $("#list-customer-table").DataTable({
        // To remove the alert
        destroy: true,

        pagingType: "full_numbers",
        pageLength: 20,
        processing: true,
        dom: "Bfrtip",

        columnDefs: [
          {
            targets: 0, // Assuming customer ID is in the first column (index 0)
            type: "num", // Use numeric sorting
            render: function (data, type, row) {
              if (type === "sort") {
                // Extract numeric part for sorting
                return parseInt(data.replace(/\D/g, ""), 10);
              }
              return data;
            },
          },
        ],

        buttons: [

          //Print button customization from the datatable
          {
            extend: "print",
            text: "Print",
            exportOptions: {
              columns: [0, 1, 2, 3, 4], // Adjust column indices as needed
            },
          },

          //Pdf button customization from the datatable
          {
            extend: "pdfHtml5",
            text: "Open in PDF",
            title: "Bhavani Sarees",
            filename: "Bhavani Sarees Customers List " + formatDate(new Date()),
            exportOptions: {
              columns: [0, 1, 2, 3, 4], // Adjust column indices as needed
            },
            customize: function (doc) {
              // Customization options for the PDF

              // Add current date to the content
              doc.content.unshift({
                text:
                  "Bhavani Sarees " +
                  formatDate(new Date(), {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }),
                style: "date",
              });

              doc.header = function () {
                return {
                  // columns: [
                  //   {
                  //     text: "Header Left",
                  //     alignment: "left",
                  //   },
                  //   {
                  //     text: "Header Center",
                  //     alignment: "center",
                  //   },
                  //   {
                  //     text: "Header Right",
                  //     alignment: "right",
                  //   },
                  // ],
                  // margin: [0, 10],
                };
              };
              doc.footer = function (currentPage, pageCount) {
                return {
                  // columns: [
                  //   {
                  //     text: "Footer Left",
                  //     alignment: "left",
                  //   },
                  //   {
                  //     text: "Footer Center",
                  //     alignment: "center",
                  //   },
                  //   {
                  //     text: "Footer Right",
                  //     alignment: "right",
                  //   },
                  // ],
                  // margin: [10, 0],
                };
              };

              doc.pageMargins = [20, 40, 20, 40]; // left, top, right, bottom
              doc.pageOrientation = "portrait"; // Set the orientation to portrait
              doc.pageSize = "A4"; // A3, A4, A5, Letter, Legal, etc.
            },
          },

          // (Column Visibility) button
          {
            extend: "colvis", // Add the colvis button
            text: "Column Visibility", // Button text
          },
        ],
      });
    }, 1000);
  });

  function formatDate(date, options = {}) {
    return date.toLocaleDateString("en-US", options).replace(/\//g, "-");
  }

  return (
    <div className="customer-list-div">
      <button
        id="show-add-customer-form-btn"
        className="btn btn-secondary"
        onClick={() => setShowAddCustomerForm(!showAddCustomerForm)}
      >
        {showAddCustomerForm
          ? "Hide Add Customer Form"
          : "Show Add Customer Form"}
      </button>

      {/* Conditionally render the "Add Customer" form */}

      {showAddCustomerForm && (
        <div className="add-customer-container">
          <div id="add-customer-maincard" className="border rounded shadow">
            <h2 id="add-customer-h2" className="m-4 text-center">
              Add a New Customer
            </h2>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="add-customer-div">
                <div className="form-floating">
                  <input
                    id="add-customer-input"
                    type={"text"}
                    className="form-control"
                    placeholder="Enter Customer ID"
                    name="customerID"
                    value={customerID}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                  <label
                    for="add-customer-input"
                    className="add-customer-label"
                  >
                    Customer ID:
                  </label>
                </div>

                <div className="form-floating">
                  <input
                    id="add-customer-input"
                    type={"text"}
                    className="form-control"
                    placeholder="Enter Customer Name "
                    name="customerName"
                    value={customerName}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                  <label
                    for="add-customer-input"
                    className="add-customer-label"
                  >
                    Name:
                  </label>
                </div>

                <div className="form-floating">
                  <input
                    id="add-customer-input"
                    type={"text"}
                    className="form-control"
                    placeholder="Customer Address"
                    name="address"
                    value={address}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                  <label
                    for="add-customer-input"
                    className="add-customer-label"
                  >
                    Address:
                  </label>
                </div>

                <div className="form-floating">
                  <input
                    id="add-customer-input"
                    type={"text"}
                    className="form-control"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                  <label
                    for="add-customer-input"
                    className="add-customer-label"
                  >
                    Phone No:
                  </label>
                </div>

                <div className="form-floating">
                  <input
                    id="add-customer-input"
                    type={"text"}
                    className="form-control"
                    placeholder="Reference"
                    name="reference"
                    value={reference}
                    onChange={(e) => onInputChange(e)}
                    required
                  />

                  <label
                    for="add-customer-input"
                    className="add-customer-label"
                  >
                    Reference
                  </label>
                </div>
                <br></br>
              </div>
              <br></br>
              <div id="add-customer-btn-div">
                <button
                  id="add-customer-submit-btn"
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>
                <button
                  id="add-customer-reset-btn"
                  className="btn btn-danger"
                  // to="/customers"
                  onClick={clearFields} // Call clearFields function
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* React Toastify container */}
      <ToastContainer position="top-center" />

      {editMode && (

        <div id="edit-customer-maincard" className="border rounded shadow">
          <h2 id="edit-customer-h2" className="text-center m-4">
            Edit Customer Details
          </h2>
          <form onSubmit={(e) => onEditSubmit(e)}>

            <div id="edit-customer-input-div">

              <div className="form-floating">
                <input
                  id="edit-customer-input"
                  type="text"
                  className="form-control"
                  placeholder="Enter Customer ID"
                  name="customerID"
                  value={editCustomerData.customerID}
                  onChange={(e) => onEditInputChange(e)}
                  required
                />
                <label
                  for="edit-customer-input"
                  className="edit-customer-label"
                >
                  Customer ID
                </label>
              </div>


              <div className="form-floating">
                <input
                  id="edit-customer-input"
                  type="text"
                  className="form-control"
                  name="customerName"
                  value={editCustomerData.customerName}
                  onChange={(e) => onEditInputChange(e)}
                  required
                />
                <label
                  for="edit-customer-input"
                  className="edit-customer-label"
                >
                  Customer Name
                </label>
              </div>

              <div className="form-floating">
                <input
                  id="edit-customer-input"
                  type="text"
                  className="form-control"
                  name="address"
                  value={editCustomerData.address}
                  onChange={(e) => onEditInputChange(e)}
                  required
                />
                <label
                  for="edit-customer-input"
                  className="edit-customer-label"
                >
                  Customer Address
                </label>
              </div>

              <div className="form-floating">
                <input
                  id="edit-customer-input"
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  value={editCustomerData.phoneNumber}
                  onChange={(e) => onEditInputChange(e)}
                  required
                />
                <label
                  for="edit-customer-input"
                  className="edit-customer-label"
                >
                  Customer Phone No
                </label>
              </div>

              <div className="form-floating">
                <input
                  id="edit-customer-input"
                  type="text"
                  className="form-control"
                  name="reference"
                  value={editCustomerData.reference}
                  onChange={(e) => onEditInputChange(e)}
                  required
                />
                <label
                  for="edit-customer-input"
                  className="edit-customer-label"
                >
                  Reference
                </label>
              </div>
            </div>

            <br></br>
            <div id="edit-customer-btn-div">
              <br></br>
              <button
                id="edit-customer-submit-btn"
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
              <Link
                id="edit-customer-cancel-btn"
                className="btn btn-danger"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Link>
            </div>
            <br></br>
          </form>
        </div>
      )}

      {/* End of the Edit customer form */}

      {/* Customers List table code */}

      <div>
        <h1 id="add-customer-h2" className="text-center">
          Customers List
        </h1>
      </div>
      <div id="list-customer-div">
        <table
          id="list-customer-table"
          className="table table-bordered table-striped shadow"
        >
          <thead id="customerlist-tableheader" className="table-dark">
            <tr id="customerlist-tableheader-row" className="text-header">
              <th className="text-center">Customer ID</th>
              <th className="text-center">Customer Name</th>
              <th className="text-center">Address</th>
              <th className="text-center">Phone number</th>
              <th className="text-center">Reference</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody id="lc-table" className="table-body fw-bold">
            {newcustomers.map((customers) => (
              <tr key={customers.customersID}>
                <td>{customers.customerID}</td>
                <td>{customers.customerName}</td>
                <td>{customers.address}</td>
                <td>{customers.phoneNumber}</td>
                <td>{customers.reference}</td>

                <td className="actions">
                  <Link
                    id="list-customers-btn-view"
                    type="button"
                    className="btn btn-primary mx-2"
                    to={`/viewcustomer/${customers.customerID}`}
                  >
                    View
                  </Link>

                  {/* <Link
                      id="list-customers-btn-edit"
                      className="btn btn-outline-primary mx-2"
                      to={`/editcustomer/${customers.customerID}`}
                    >
                      Edit
                    </Link> */}

                  <button
                    id="list-customers-btn-edit"
                    className="btn btn-outline-primary mx-2"
                    onClick={() => onEditClick(customers.customerID)}
                  >
                    Edit
                  </button>

                  <button
                    id="list-customers-btn-delete"
                    className="btn btn-danger mx-2"
                    onClick={() =>
                      handleShowConfirmation(customers.customerID)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal
          show={showConfirmation}
          onHide={handleCloseConfirmation}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this customer?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseConfirmation}>
              No
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>


      {/* "Go to Top" button */}
      <button id="go-to-top-btn" onClick={() => window.scrollTo(0, 0)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="18"
          fill="currentColor"
          className="bi bi-arrow-up"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
          />
        </svg>
      </button>
    </div>
  );
};

export default CustomerDetails;
