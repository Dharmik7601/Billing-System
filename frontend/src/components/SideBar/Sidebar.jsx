import React from 'react'
import './Sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {useNavigate}  from 'react-router-dom'

function Sidebar() {
    const Navigate = useNavigate()

    const handlePage = (e) => {
        console.log(e.target.id);
        switch (e.target.id) {
            case "dashboard":
                Navigate('/user/home')
                break
            case "addProduct":
                Navigate('/user/product/add')
                break
            case "addProductTemplate":
                Navigate('/user/product/add/template')
                break
            case "allProducts":
                Navigate('/user/product/all')
                break
            case "addParty":
                Navigate('/user/party/add')
                break
            case "allParty":
                Navigate('/user/party/all')
                break
            case "registerProduct":
                Navigate('/user/party/register-product')
                break
            case "userDetails":
                Navigate('/user/home')
                break
            case "registerBillBook":
                Navigate('/user/bill-book/register')
                break
            case "viewAllBillBook":
                Navigate('/user/bill-book/all')
                break
            case "generateInvoice":
                Navigate('/user/generate-invoice')
                break
            default:
                alert('Inavlide')
        }
    }
    return (
        <div className='sidebar'>
            <div className="top">
                <span className="logo">User logo</span>
            </div>
            <hr/>
            <div className="center">
                <ul style={{marginTop :"10px"}}>
                    <li onClick={handlePage} id='dashboard'>
                        <DashboardIcon className='icon'/>
                        <span id='dashboard'>Dashboard</span>
                    </li>
                </ul>
                    
                <ul>
                    <p className="title">Product</p>
                    <li onClick={handlePage} id='addProduct'>
                        <CategoryIcon className='icon' />
                        <span id='addProduct'>Add product</span>
                    </li>
                    <li onClick={handlePage} id='addProductTemplate'>
                        <CategoryIcon className='icon' />
                        <span id='addProductTemplate' >Add Product Template</span>
                    </li>
                    <li onClick={handlePage} id='allProducts'>
                        <CategoryIcon className='icon' />
                        <span id='allProducts'>View All</span>
                    </li>
                    
                </ul>
                <ul>
                    <p className="title">Party</p>
                    <li onClick={handlePage} id='addParty'>
                        <AddBusinessIcon className='icon'/>
                        <span id='addParty'>Add Party</span>
                    </li>
                    <li onClick={handlePage} id='allParty'>
                        <AddBusinessIcon className='icon'/>
                        <span id='allParty'>View All</span>
                    </li>
                    <li onClick={handlePage} id='registerProduct'>
                        <CategoryIcon className='icon' id='registerProduct'/>
                        <span id='registerProduct' >Register Product</span>
                    </li>
                </ul>
                <ul>
                    <p className="title">Order</p>
                    <li onClick={handlePage} id='registerBillBook'>
                        <AccountBalanceWalletOutlinedIcon className='icon'  id='registerBillBook'/>
                        <span >Register Bill Book</span>
                    </li>
                    <li onClick={handlePage} id='viewAllBillBook'>
                        <AccountBalanceWalletOutlinedIcon className='icon' id='viewAllBillBook'/>
                        <span >View All Bill Book</span>
                    </li>
                    <li onClick={handlePage} id='generateInvoice'>
                        <AccountBalanceWalletOutlinedIcon className='icon'/>
                        <span >Generate Invoice</span>
                    </li>
                </ul>
                <ul>
                    <p className="title">User</p>
                    <li onClick={handlePage} id='userDetails'>
                        <AccountCircleOutlinedIcon className='icon'/>
                        <span >User Details</span>
                    </li>
                    <li>
                        <LogoutOutlinedIcon className='icon'/>
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                bottom
            </div>
        </div>
    )
}

export default Sidebar