import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

import CurrentDateTime from './CurrentDateTime';
import Navbar from './Navbar/Navbar';

import CustomerDetails from './CustomerDetails/CustomerDetails';
import ViewCustomer from './CustomerDetails/ViewCustomer';

import CustomerReport from './Reports/CustomerReport';
import Print from './Reports/Print';
import Excel from './Reports/Excel';

// Seller imports
import SellerList from './components/SellerList';
import InvoiceList from './components/InvoiceList';
import InvoiceDetail from './components/InvoiceDetail';
import ReturnList from './components/ReturnList';

function App() {
  return (
    <div className='App'>
      <Router>
        <CurrentDateTime />
        <Navbar />
        
        <Routes>
          <Route path='/' element={<index />} />
          <Route path='/Home' element={<index />} />
          
          {/* Customer Details */}
          <Route path='/customers' element={<CustomerDetails />} />
          <Route path='/viewcustomer/:customerID' element={<ViewCustomer />} />
          
          {/* Seller Details */}
          

          <Route exact path='/sellers' element={<SellerList />} />
          <Route path='/invoices/seller/:sellerId' element={<InvoiceList />} />
          <Route path='/invoices/:sellerId/:invoiceId' element={<InvoiceDetail />} />
          <Route path='/returns/:invoiceId' element={<ReturnList />} />
          
          {/* Reports */}
          <Route path='/customer/reports' element={<CustomerReport />} />
          <Route path='/print' element={<Print />} />
          <Route path='/excel' element={<Excel />} />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
