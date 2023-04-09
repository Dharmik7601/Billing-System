import React,{useEffect, useState} from 'react'
import Divider from '@mui/material/Divider';
import "./Invoice.scss"
import 'antd/dist/reset.css'
import InvoiceTable from "../InvoiceTable/InvoiceTable"
import acuteLogo from '../../images/acute-logo-transparent.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Invoice = ({invoiceDetails,companyDetails,itemDetails,partyDetails}) => {
    
    return (
        <div style={{ padding: 20 }} className="inovice">
            <div className="top">
                <div className="logo">
                    <img src={acuteLogo} className="companyLogo"></img>
                </div>
                <div className="comapnyAddress">
                    <h3>{companyDetails.companyName}</h3><br></br>
                    <div>{companyDetails.companyAddress},</div>
                    <div>{companyDetails.companyEmail},</div>
                    <div>GST No:- {companyDetails.companyGstNumber},</div>
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
                                <th colspan="4">Invoice ID: {invoiceDetails.invoiceId}</th>
                                <th colspan="3">Financial Year: {invoiceDetails.billBookFinancialYear}</th>
                            </tr>
                            <tr>
                                <th>Invoice Type</th>
                                <th>Invoice Number</th>
                                <th>Invoice Date</th>
                                <th>Due Date</th>
                                <th>Shipping Company Name:</th>
                                <th>Shipping Type:</th>
                            </tr>
                            <tr>
                                <td>{invoiceDetails.billBookType}</td>
                                <td>{invoiceDetails.billBookNumber}</td>
                                <td>{invoiceDetails.billDate}</td>
                                <td>{invoiceDetails.billDueDate}</td>
                                <td>{invoiceDetails.shippingName}</td>
                                <td>{invoiceDetails.shippingType}</td>
                            </tr>
                            <tr>
                                <th colspan="3">Bill To:  {invoiceDetails.partyName}</th>
                                <th colspan="3">Email: {partyDetails.partyEmail} <br></br> Mobile number: {partyDetails.partyMobile}</th>
                                
                            </tr>
                            <tr>
                                <th colspan="3">Billing Address: {invoiceDetails.billingAddress}</th>
                                <th colspan="3">Shipping Address:  {invoiceDetails.shippingAddress}</th>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div className="costDetails">
                <InvoiceTable rowData={itemDetails} invoiceType={invoiceDetails.billBookType} />
            </div>
            <div className="paymentDetails">
                <h3>Payment Details:</h3>
                <div className="payment">Account Number: {companyDetails.companyAccountNumber}</div>
                <div className="payment">IFSC Code: {companyDetails.companyIfscCode}</div>
            </div>
        </div>
    );
}

export default Invoice