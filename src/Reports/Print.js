import React from "react";

//Bootstrap and jQuery libraries
import "jquery/dist/jquery.min.js";

//Datatable Modules
import 'datatables.net-dt';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";

import "../Reports/Print.css";

//For API Requests
import axios from "axios";

class Print extends React.Component {

    // State array variable to save and show data
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    async componentDidMount() {
        try {
            // Get all users details in bootstrap table
            const response = await axios.get("http://localhost:8080/customers");
            
            // Storing users detail in state array object
            this.setState({ data: response.data });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
                
        //initialize datatable
        $(document).ready(function () {
            setTimeout(function(){
                $("#list-customer-table").DataTable({
                    
                    // To remove the alert
                    destroy: true, 
        
                    pagingType: "full_numbers",
                    pageLength: 10,
                    processing: true,
                    dom: 'Bfrtip',
                    
                    buttons: [

                        'copy', 'excel', 'csv', 'print',
                        
                        {
                            extend: 'excelHtml5',
                            exportOptions: {
                                columns: ':visible'
                            }
                        },
                        {
                            extend: 'pdfHtml5',
                            exportOptions: {
                                columns: [ 1, 2, 4 ]
                            }
                        },
                        'colvis'
                        
                    ],
                });
        
            } ,1000);
        });
    };

    render() {

        //Datatable HTML
        return (
            <div className="container">
                
                {/* <button className="btn btn-primary" 
                    onClick={onDownload}>
                    Export to Excel
                </button> */}

                <br></br>
                
                <div className="excel-btn-div">
                <button id="excel-btn" className="btn btn-primary">
                <a id = "excel-a" href='/excel'>Export to Excel</a>
                </button>
                </div>

                <br></br>
                <div id='list-customer-div'>
                    <table id='list-customer-table' className="table table-striped">
                        <thead id="lc-table" className="table-dark">
                            <tr className="text-header m-1">
                                <th>Customer ID</th>
                                <th>Customer Name</th>
                                <th>Address</th>
                                <th>Phone number</th>
                                <th>Reference</th>
                            </tr>
                        </thead>

                        <tbody id="lc-table" className="table-body">
                        {this.state.data.map((result) => (
                                <tr key={result.customersID}>
                                    <td>{result.customerID}</td>
                                    <td>{result.customerName}</td>
                                    <td>{result.address}</td>
                                    <td>{result.phoneNumber}</td>
                                    <td>{result.reference}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            </div>
        );
    }
}
export default Print;
