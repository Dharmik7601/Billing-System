import React from 'react'
import Divider from '@mui/material/Divider';
import "./Invoice.scss"
import 'antd/dist/reset.css'
import InvoiceTable from "../InvoiceTable/InvoiceTable"
import acuteLogo from '../../images/acute-logo-transparent.png'

const Invoice = () => {

    return (
        <div style={{ padding: 20 }} className="inovice">
            <div className="top">
                <div className="logo">
                    <img src={acuteLogo} className="companyLogo"></img>
                </div>
                <div className="comapnyAddress">
                    <h3>Comapny Name</h3>
                    <div>Address line 11111111111111,</div>
                    <div>GST No:- XXXXXXXXXXXXXXXXXXXX,</div>
                </div>
            </div>
            <div className="divider">
                <Divider>Invoice</Divider>
            </div>
            <div className="mid">
                <div className="left">
                    <div className="left-top">
                        <table className='invoiceTable'>
                            <tr>
                                <th colspan="4">Invoice ID: xxxxxxxxxx</th>
                                <th colspan="3">Shipping Information</th>
                            </tr>
                            <tr>
                                <th>Invoice Type</th>
                                <th>Invoice Number</th>
                                <th>Invoice Date</th>
                                <th>Due Date</th>
                                <th>Shipping Company Name:</th>
                                <th>Shipping Type:</th>
                                <th>Shipping Address:</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td>99</td>
                                <td>10-01-2018</td>
                                <td>Party Name</td>
                                <td>Party Name</td>
                                <td>Party Name</td>
                            </tr>
                            <tr>
                                <th colspan="3">Bill To</th>
                                <th colspan="4">Address</th>
                            </tr>
                            <tr>
                                <td colspan="3">Party Name</td>
                                <td colspan="4">Party Company Address line 11111111111</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div className="costDetails">
                <InvoiceTable />
            </div>
            <div className="paymentDetails">
                <h3>Payment Details:</h3>
                <div className="payment">Account No: XXXXXXXXXX</div>
                <div className="payment">IFSC code :- XXXXXXXXX</div>
            </div>
        </div>
    );
}

export default Invoice