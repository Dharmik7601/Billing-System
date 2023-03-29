import React from 'react'

import Divider from '@mui/material/Divider';
import "./Invoice.scss"
import { Col, Row, Table } from 'antd';
import 'antd/dist/reset.css'
import InvoiceTable from '../../../../components/InvoiceTable/InvoiceTable';
import acuteLogo from '../../../../images/acute-logo-transparent.png'

function Invoice() {

    return (
        <div style={{ padding: 20 }} className="inovice">
            <div className="top">
                <div className="logo">
                    <img src={acuteLogo} className="companyLogo"></img>
                </div>
                <div className="comapnyAddress">
                    <h3>Eco Haya</h3>
                    <div>#944/945, 4th Cross, 9th Main,</div>
                    <div>Vijaya Bank Layout,</div>
                    <div>Bannerghatta Road,</div>
                </div>
            </div>
            <div className="divider">
                <Divider>Invoice</Divider>
            </div>
            <div className="mid">
                <div className="left">
                    <div>Bill To: <strong>Strides Shasun Ltd</strong></div>
          <h3>Eco Haya</h3>
          <div>#944/945, 4th Cross, 9th Main,</div>
          <div>Vijaya Bank Layout,</div>
          <div>Bannerghatta Road,</div>
                  <div>Bangalore - 560076</div>
              </div>
            <div className="right">
                <table>
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
    </div>

    <InvoiceTable />
    </div>
  );
}

export default Invoice