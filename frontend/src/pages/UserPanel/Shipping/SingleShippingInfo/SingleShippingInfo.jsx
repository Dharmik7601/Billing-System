import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DataTable from '../../../../components/DataTables/DataTable'
import NavBar from '../../../../components/NavBar/NavBar'
import Sidebar from '../../../../components/SideBar/Sidebar'
import "./SingleShippingInfo.scss"
import axios from 'axios'
import Table from '../../../../components/Tables/Table'
import { checkAuth } from '../../../../components/AdditonalFunc/checkAuth'

function SingleShippingInfo() {

    const Navigate = useNavigate()

    const isUser = async () => {
        let check = await checkAuth()
        if (!check) {
            Navigate("/")
            return
        }
    }

    const [transportationinfo, setTransportationinfo] = useState({})
    const [shippingInfo, setShippingInfo] = useState([])

    const { shippingId } = useParams()

    const getShippingInfo = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/shipping/get/single/info/${shippingId}`, {
                withCredentials: true
            }).then(response => {
                setShippingInfo(response.data)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }


    useEffect(() => {
        getShippingInfo();
        isUser()
    }, [])

    const columnsTransportationItem = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true
        },
        {
            name: "PRODUCT NAME",
            selector: (row) => row.itemName,
            sortable: true
        },
        {
            name: "TEMPLATE NAME",
            selector: (row) => row.templateName,
            sortable: true
        },
    ];


    return (
        <div className='singleItem'>
            <Sidebar />
            <div className="singleItemContainer">
                <NavBar />
                <div className="inputContainer">
                    <div className="top">
                        <div className="tcontainer">
                            {/* <div className="title">
                            Transportation Information
                        </div> */}
                            <div className="top-1">
                                <div className="itemInfo">
                                    <div className="itemID">
                                        <span className="proKey">
                                            Shipping Company Name:
                                        </span>
                                        <span className="proValue">
                                            {shippingInfo.shippingName}
                                        </span>
                                    </div>
                                    <div className="itemInfo">
                                    <div className="itemID">
                                        <span className="proKey">
                                            Shipping ID:
                                        </span>
                                        <span className="proValue">
                                            {shippingInfo.shippingId}
                                        </span>
                                        </div>
                                        </div>
                                    <div className="itemName">
                                        <span className="proKey">
                                            Shipping Type:
                                        </span>
                                        <span className="proValue">
                                            {shippingInfo.shippingType}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="top-1">
                                {/* <div className="itemQunatity">
                                        <span className="proKey">
                                            Transportation Description:
                                        </span>
                                        <span className="proValue">
                                            {transportationinfo.transportationDescription}
                                        </span>
                                    </div> */}
                                <div className="itemInfo">
                                    <div className="itemID">
                                        <span className="proKey">
                                            Shipping Description:
                                        </span>
                                        <span className="proValue">
                                            {shippingInfo.shippingDescription}
                                        </span>
                                    </div>
                                    <div className="itemID">
                                        <span className="proKey">
                                            Shipping Office Address:
                                        </span>
                                        <span className="proValue">
                                            {shippingInfo.shippingOfficeAddress}
                                        </span>
                                    </div>
                                    <div className="itemName">
                                        <span className="proKey">
                                            Mobile Number:
                                        </span>
                                        <span className="proValue">
                                            {shippingInfo.mobile}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="top-1">
                                <div className="itemInfo">
                                    <div className="itemQunatity">
                                        <span className="proKey">
                                            Email:
                                        </span>
                                        <span className="proValue">
                                            {shippingInfo.email}
                                        </span>
                                    </div>
                                    <div className="itemID">
                                        <span className="proKey">
                                            GST number:
                                        </span>
                                        <span className="proValue">
                                            {shippingInfo.gstNumber}
                                        </span>
                                    </div>
                                    <div className="itemName">
                                        <span className="proKey">
                                            Account Number:
                                        </span>
                                        <span className="proValue">
                                            {shippingInfo.accountNumber}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <div className="bottom">
                        <div className="bcontainer">
                            <div className="itemsSoldBy">
                                <Table columnsData={columnsTransportationItem} rowData={transportationitemInfo} />
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default SingleShippingInfo