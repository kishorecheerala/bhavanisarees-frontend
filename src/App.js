import { BrowserRouter as Router, Routes, Route } from "react-router-dom" ;

import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

import CurrentDateTime from "./CurrentDateTime";
import Navbar from './Navbar/Navbar';

import CustomerDetails from './CustomerDetails/CustomerDetails';
import ViewCustomer from './CustomerDetails/ViewCustomer';
import SellerDetails from './SellerDetails/SellerDetails';

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
        
        <Route exact path="/" element={<index/>}/>
        <Route exact path="/Home" element={<index/>}/>
        
        {/* Customer Details */}
        <Route exact path="/customers" element={<CustomerDetails/>}/>
        <Route exact path="/viewcustomer/:customerID" element={<ViewCustomer/>}/>

        {/* Seller Details */}
        <Route exact path="/sellers" element={<SellerDetails/>}/>

        {/* Reports */}
        <Route exact path="/customer/reports" element={<CustomerReport/>}/>
        <Route exact path="/print" element={<Print/>}/>
        <Route exact path="/excel" element={<Excel/>}/>

      
      </Routes>

      <div>
        <h1>Seller Management System</h1>
        <Routes>
          <Route path="/" exact component={SellerList} />
          <Route path="/invoices/:sellerId" exact component={InvoiceList} />
          <Route path="/invoices/:sellerId/:invoiceId" component={InvoiceDetail} />
          <Route path="/returns/:invoiceId" component={ReturnList} />
        </Routes>
      </div>

      </Router>
    </div>
  );}

export default App;
