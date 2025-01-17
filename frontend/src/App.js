import { Routes, Route } from 'react-router-dom'

// Login and Regsteration components
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

// OTP components
import LoginOtp from './pages/OTP/login-otp/login-otp';
import RegisterOtp from './pages/OTP/register-otp/register-otp';

//User Panel components
import Dasboard from './pages/UserPanel/Dashboard/Dashboard';
import ViewItems from './pages/UserPanel/Item/ViewItem/ViewItems';
import SingleItem from './pages/UserPanel/Item/SingleItem/SingleItem';
import ViewParties from './pages/UserPanel/Party/ViewParty/ViewParties';
import SingleParty from './pages/UserPanel/Party/SingleParty/SingleParty';
import AddParty from './pages/UserPanel/Party/AddParty/AddParty';
import AddShipping from './pages/UserPanel/Shipping/AddShippingInfo/AddShipping';
import ViewAllShippingInfo from './pages/UserPanel/Shipping/ViewAllShippingInfo/ViewAllShippingInfo';
import SingleShippingInfo from './pages/UserPanel/Shipping/SingleShippingInfo/SingleShippingInfo';
import AddItem from './pages/UserPanel/Item/AddItem/AddItem';
import Testing from './pages/Testing/Testing';
import AddItemTemplate from './pages/UserPanel/Item/AddItemTemplate/AddItemTemplate';
import RegisterBillBook from './pages/UserPanel/BillBook/RegisterBillBook/RegisterBillBook';
import ViewAllBillBooks from './pages/UserPanel/BillBook/ViewAllBillBook/ViewAllBillBooks';
import BillBookDetails from './pages/UserPanel/BillBook/BillBookDetails/BillBookDetails';
import SingleBillBook from './pages/UserPanel/BillBook/SingleBillBook/SingleBillBook';
import GenerateInvoice from './pages/UserPanel/BillBook/GenerateInvoice/GenerateInvoice';
import ViewInvoice from './pages/UserPanel/BillBook/ViewInvoice/ViewInvoice';
import UserDetails from './pages/UserPanel/UserDetails/UserDetails';


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

        {/* Item routes */}
        <Route path='/user/item/all' element={<ViewItems />} />
        <Route path='/user/item/single/:itemId' element={<SingleItem />} />
        <Route path='/user/item/add' element={<AddItem />} />
        <Route path='/user/item/add/template' element={<AddItemTemplate />} />

        {/* Party routes */}
        <Route path='/user/party/all' element={<ViewParties />} />
        <Route path='/user/party/single/:partyId' element={<SingleParty />} />
        <Route path='/user/party/add' element={<AddParty />} />

        {/* Transportation routes */}
        <Route path='/user/shipping/add' element={<AddShipping />} />
        <Route path='/user/shipping/all' element={<ViewAllShippingInfo />} />
        <Route path='/user/shipping/single/info/:shippingId' element={<SingleShippingInfo />} />

        {/* Bill Book routes */}
        <Route path='/user/bill-book/register' element={<RegisterBillBook />} />
        <Route path='/user/bill-book/all' element={<ViewAllBillBooks />} />
        <Route path='/user/bill-book/invoice/:invoiceId' element={<ViewInvoice />} />
        <Route path='/user/bill-book/all/bill-book-details/:billBookName' element={<BillBookDetails />} />
        <Route path='/user/bill-book/all/bill-book-details/single-bill-book' element={<SingleBillBook />} />

        {/* Generate invoice */}
        <Route path='/user/generate-invoice' element={<GenerateInvoice />} />
		
		{/* User Details */}
        <Route path='/user/user-details' element={<UserDetails />} />

        {/* Testing Routes */}
        <Route path='/test' element={<Testing />} />
      </Routes>
    </div>
  );
}

export default App;
