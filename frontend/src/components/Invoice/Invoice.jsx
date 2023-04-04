import React from 'react'
import Divider from '@mui/material/Divider';
import "./Invoice.scss"
import 'antd/dist/reset.css'
import InvoiceTable from "../InvoiceTable/InvoiceTable"
import acuteLogo from '../../images/acute-logo-transparent.png'

const Invoice = ()=> {

    return (
        <div style={{ padding: 20 }} className="inovice">
            <div className="top">
                <div className="logo">
                    <img src={acuteLogo} className="companyLogo"></img>
                </div>
                {/* <div className="comapnyDetails">
                    
                    <div>Account No: XXXXXXXXXX</div>
                    <div>IFSC code :- XXXXXXXXX</div>
                </div> */}
                <div className="comapnyAddress">
                    <h3>Comapny Name</h3>
                    <div>Address line 11111111111111,</div>
                    <div>GST No:- XXXXXXXXXXXXXXXXXXXX,</div>
                    {/* <div>Vijaya Bank Layout,</div>
                    <div>Bannerghatta Road,</div> */}
                </div>
            </div>
            <div className="divider">
                <Divider>Invoice</Divider>
            </div>
            <div className="mid">
                <div className="left">
                    <div className="left-top">
                        <table>
                    <tr>
                        <th>Invoice ID:</th>
                        <td>1</td>
                    </tr>
                    <tr>
                        <th>Invoice Number :</th>
                        <td>1</td>
                    </tr>
                    <tr>
                        <th>Invoice Date :</th>
                        <td>99</td>
                    </tr>
                    <tr>
                        <th>Due Date :</th>
                        <td>10-01-2018</td>
                    </tr>
                </table>
                    </div>
                    <div className="left-bottom">
                        <div>Bill To: <strong> Party Name </strong></div>
                        <div>Party Company Address line 11111111111</div>
                    </div>
                </div>
                <div className="right">
                    <h3>Shipping Information:</h3>
                    <div>Shipping Company Name: <strong> Party Name </strong></div>
                    <div>Shipping Type: <strong> Party Name </strong></div>
                    <div>Shipping Address: <strong> Party Name </strong></div>
            </div>
            </div>
            
            <div className="costDetails">

                <InvoiceTable />
                </div>
             <div className="paymentDetails">
                    <h3>Payment Details:</h3>
                    <div>Account No: XXXXXXXXXX</div>
                    <div>IFSC code :- XXXXXXXXX</div>
                </div>
    </div>
  );
}

export default Invoice