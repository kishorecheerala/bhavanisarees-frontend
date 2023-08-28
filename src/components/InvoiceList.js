import React from 'react';
import { useParams } from 'react-router-dom';

function InvoiceList() {
  const { sellerId } = useParams();

  // Fetch invoices based on sellerId using Redux or API calls

  return (
    <div>
      <h2>Invoices for Seller {sellerId}</h2>
      {/* Display invoices here */}
    </div>
  );
}

export default InvoiceList;
