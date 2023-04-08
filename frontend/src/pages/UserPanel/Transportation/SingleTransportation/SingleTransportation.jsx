import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DataTable from '../../../../components/DataTables/DataTable'
import NavBar from '../../../../components/NavBar/NavBar'
import Sidebar from '../../../../components/SideBar/Sidebar'
import "./SingleTransportation.scss"
import axios from 'axios'
import Table from '../../../../components/Tables/Table'

function SingleTransportation() {

    const [transportationinfo, setTransportationinfo] = useState({})
    const [transportationitemInfo, setTransportationItemInfo] = useState([])

    const { transportationId } = useParams()

    const getTransportationInfo = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/transportation/single/${transportationId}`, {
                withCredentials: true
            }).then(response => {
                console.log(response.data);
                setTransportationinfo(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const getTransportationItemInfo = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/transportation/transportation-item/all/${transportationId}`, {
                withCredentials: true
            }).then(response => {
                console.log(response.data);
                setTransportationItemInfo(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getTransportationInfo();
        getTransportationItemInfo()
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
                                            Transportation Name:
                                        </span>
                                        <span className="proValue">
                                            {transportationinfo.transportationName}
                                        </span>
                                    </div>
                                    <div className="itemName">
                                        <span className="proKey">
                                            Transportation Type:
                                        </span>
                                        <span className="proValue">
                                            {transportationinfo.transportationType}
                                        </span>
                                    </div>
                                    <div className="itemQunatity">
                                        <span className="proKey">
                                            Transportation Description:
                                        </span>
                                        <span className="proValue">
                                            {transportationinfo.transportationDescription}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="top-1">
                                <div className="itemInfo">
                                    <div className="itemID">
                                        <span className="proKey">
                                            Office Address:
                                        </span>
                                        <span className="proValue">
                                            {transportationinfo.officeAddress}
                                        </span>
                                    </div>
                                    <div className="itemName">
                                        <span className="proKey">
                                            Mobile Number:
                                        </span>
                                        <span className="proValue">
                                            {transportationinfo.transportationMobile}
                                        </span>
                                    </div>
                                    <div className="itemQunatity">
                                        <span className="proKey">
                                            Email:
                                        </span>
                                        <span className="proValue">
                                            {transportationinfo.transportationEmail}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="top-1">
                                <div className="itemInfo">
                                    <div className="itemID">
                                        <span className="proKey">
                                            GST number:
                                        </span>
                                        <span className="proValue">
                                            {transportationinfo.gstNumber}
                                        </span>
                                    </div>
                                    <div className="itemName">
                                        <span className="proKey">
                                            Account Number:
                                        </span>
                                        <span className="proValue">
                                            {transportationinfo.accountNumber}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="bottom">
                        <div className="bcontainer">
                            <div className="itemsSoldBy">
                                <Table columnsData={columnsTransportationItem} rowData={transportationitemInfo} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleTransportation