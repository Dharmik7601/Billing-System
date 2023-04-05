import React from 'react'
import './Sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from 'react-router-dom'
import logo from "../../images/acute-logo.png";

function Sidebar() {
    const Navigate = useNavigate()

    const handlePage = (e) => {
        console.log(e.target.id);
        switch (e.target.id) {
            case "dashboard":
                Navigate('/user/home')
                break
            case "addItem":
                Navigate('/user/item/add')
                break
            case "addItemTemplate":
                Navigate('/user/item/add/template')
                break
            case "allItems":
                Navigate('/user/item/all')
                break
            case "addParty":
                Navigate('/user/party/add')
                break
            case "allParty":
                Navigate('/user/party/all')
                break
            // case "registerItem":
            //     Navigate('/user/party/register-item')
            //     break
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
                alert('Invalid')
        }
    }
    return (
        <div className='sidebar'>
            <div className="top">
                <img src={logo} alt="company logo" className='compamyLogo'/>
                {/*<span className="logo">User logo</span>*/}
            </div>
            <div className='space'></div>
            <div className="center">
                <ul style={{ marginTop: "10px" }}>
                    <li onClick={handlePage} id='dashboard'>
                        <DashboardIcon className='icon' />
                        <span id='dashboard'>Dashboard</span>
                    </li>
                </ul>

                <ul>
                    <p className="title">Items	</p>
                    <li onClick={handlePage} id='addItem'>
                        <CategoryIcon className='icon' />
                        <span id='addItem'>Add Item</span>
                    </li>
                    <li onClick={handlePage} id='addItemTemplate'>
                        <CategoryIcon className='icon' />
                        <span id='addItemTemplate' >Add Item Template</span>
                    </li>
                    <li onClick={handlePage} id='allItems'>
                        <CategoryIcon className='icon' />
                        <span id='allItems'>View All</span>
                    </li>

                </ul>
                <ul>
                    <p className="title">Party</p>
                    <li onClick={handlePage} id='addParty'>
                        <AddBusinessIcon className='icon' />
                        <span id='addParty'>Add Party</span>
                    </li>
                    <li onClick={handlePage} id='allParty'>
                        <AddBusinessIcon className='icon' />
                        <span id='allParty'>View All</span>
                    </li>
                    {/* <li onClick={handlePage} id='registerItem'>
                        <CategoryIcon className='icon' id='registerItem'/>
                        <span id='registerItem' >Register Item</span>
                    </li> */}
                </ul>
                <ul>
                    <p className="title">Order</p>
                    <li onClick={handlePage} id='registerBillBook'>
                        <AccountBalanceWalletOutlinedIcon className='icon' id='registerBillBook' />
                        <span >Register Bill Book</span>
                    </li>
                    <li onClick={handlePage} id='viewAllBillBook'>
                        <AccountBalanceWalletOutlinedIcon className='icon' id='viewAllBillBook' />
                        <span >View All Bill Books</span>
                    </li>
                    <li onClick={handlePage} id='generateInvoice'>
                        <AccountBalanceWalletOutlinedIcon className='icon' />
                        <span >Generate Invoice</span>
                    </li>
                </ul>
                <ul>
                    <p className="title">User Actions</p>
                    <li onClick={handlePage} id='userDetails'>
                        <AccountCircleOutlinedIcon className='icon' />
                        <span >User Details</span>
                    </li>
                    <li>
                        <LogoutOutlinedIcon className='icon' />
                        <span>Log Out</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
