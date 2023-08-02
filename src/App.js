import { BrowserRouter as Router, Routes, Route } from "react-router-dom" ;

import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import DataTable from 'datatables.net-dt';

import Navbar from './Navbar/Navbar';
import AddCustomer from './CustomerDetails/AddCustomer';
import ListCustomers from './CustomerDetails/ListCustomers';
import EditCustomer from './CustomerDetails/EditCustomer';
import ViewCustomer from './CustomerDetails/ViewCustomer';
import AddSeller from './SellerDetails/AddSeller';
import EditSeller from './SellerDetails/EditSeller';
import ListSellers from './SellerDetails/ListSellers';
import ViewSeller from './SellerDetails/ViewSeller';
import CustomerReport from './Reports/CustomerReport';
import Print from './Reports/Print';
import Excel from './Reports/Excel';

function App() {
  return (

    <div className='App'>
      <Router>
      <Navbar />

      <Routes>
        
        <Route exact path="/" element={<index/>}/>
        <Route exact path="/Home" element={<index/>}/>
        
        {/* Customer Details */}
        <Route exact path="/customers" element={<ListCustomers/>}/>
        <Route exact path="/newcustomer" element={<AddCustomer/>}/>
        <Route exact path="/editcustomer/:customerID" element={<EditCustomer/>}/>
        <Route exact path="/viewcustomer/:customerID" element={<ViewCustomer/>}/>

        {/* Seller Details */}
        <Route exact path="/sellers" element={<ListSellers/>}/>
        <Route exact path="/newseller" element={<AddSeller />}/>
        <Route exact path="/sellers/:sellerID" element={<EditSeller/>}/>
        <Route exact path="/sellers/:sellerID" element={<ViewSeller/>}/>

        {/* Reports */}
        <Route exact path="/customer/reports" element={<CustomerReport/>}/>
        <Route exact path="/print" element={<Print/>}/>
        <Route exact path="/excel" element={<Excel/>}/>

      
      </Routes>

      </Router>
    </div>
  );}

export default App;
