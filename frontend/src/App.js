import './App.css';
import { Routes, Route } from 'react-router-dom'

// Login and Regsteration components
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login'; 
import Register from './pages/Register/Register';

// OTP components
import LoginOtp from './pages/OTP/login-otp/login-otp';
import RegisterOtp from './pages/OTP/register-otp/register-otp';

//User Panel components
import Dasboard from './pages/UserPanel/Dashboard/Dasboard';
import ViewProducts from './pages/UserPanel/Product/ViewProducts/ViewProducts';
import SingleProduct from './pages/UserPanel/Product/SingleProduct/SingleProduct';
import ViewParties from './pages/UserPanel/Party/ViewParty/ViewParties';
import SingleParty from './pages/UserPanel/Party/SingleParty/SingleProduct';
import AddParty from './pages/UserPanel/Party/AddParty/AddParty';
import AddItem from './pages/UserPanel/Item/AddItem/AddItem';
import Testing from './pages/Testing/Testing';
import AddProductTemplate from './pages/UserPanel/Product/AddProductTemplate/AddProductTemplate';
import RegisterProduct from './pages/UserPanel/Party/RegisterProduct/RegisterProduct';
import RegisterBillBook from './pages/UserPanel/BillBook/RegisterBillBook/RegisterBillBook';
import ViewAllBillBooks from './pages/UserPanel/BillBook/ViewAllBillBook/ViewAllBillBooks';
import GenerateInvoice from './pages/UserPanel/BillBook/GenerateInvoice/GenerateInvoice';
import Invoice from './pages/UserPanel/BillBook/Invoice/Invoice';



function App() {
  return (
    <div className="App">
      <Routes>
        {/* Login and Registration routes */}
        <Route exact path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Otp route */}
        <Route path='/login/enter-otp' element={<LoginOtp />} />
        <Route path='/register/enter-otp' element={<RegisterOtp />} />

        {/* User Panel routes */}
        <Route path='/user/home' element={<Dasboard />} />

        {/* Product routes */}
        <Route path='/user/item/all' element={<ViewProducts />} />
        <Route path='/user/item/single/:productId' element={<SingleProduct />} />
        <Route path='/user/item/add' element={<AddProduct />} />
        <Route path='/user/item/add/template' element={<AddProductTemplate />} />

        {/* Party routes */}
        <Route path='/user/party/all' element={<ViewParties />} />
        <Route path='/user/party/single/:partyId' element={<SingleParty />} />
        <Route path='/user/party/add' element={<AddParty />} />
        <Route path='/user/party/register-product' element={<RegisterProduct />} />

        {/* Bill Book routes */}
        <Route path='/user/bill-book/register' element={<RegisterBillBook />} />
        <Route path='/user/bill-book/all' element={<ViewAllBillBooks />} />
        <Route path='/user/bill-book/invoice' element={<Invoice />} />

        {/* Generate invoice */}
        <Route path='/user/generate-invoice' element={<GenerateInvoice />} />
        

        {/* Testing Routes */}
        <Route path='/test' element={<Testing />} />
      </Routes>
    </div>
  );
}

export default App;
