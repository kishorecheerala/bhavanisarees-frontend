import React, { useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";

import "../Reports/Excel.css";

const Excel = () => {
    let users = [
        {
            name: "Operation",
            lastName: "Dev",
        },
        {
            name: "Luciano",
            lastName: "Canziani",
        },
    ];

    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: "Customer Details",
        sheet: "Customer Details",
    });

    return (
        <div className="container">
            <div className="excel-btn-div">
                <button id="excel-btn" className="btn btn-primary"
                    onClick={onDownload}>
                    Export to Excel
                </button>
            </div>
            <div className="table-div">
                <table id="excel-table" className="table table-stripe table-bordered text-center" ref={tableRef}>
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <th>{user.name}</th>
                                    <th>{user.lastName}</th>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Excel;