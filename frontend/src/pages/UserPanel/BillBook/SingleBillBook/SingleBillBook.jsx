import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DataTable from '../../../../components/DataTables/DataTable'
import NavBar from '../../../../components/NavBar/NavBar'
import Sidebar from '../../../../components/SideBar/Sidebar'
import "./SingleBillBook.scss"
import axios from 'axios'
import Table from '../../../../components/Tables/Table'

function SingleBillBook() {

    const [billBookinfo, setBillBookinfo] = useState({})
    const [billBookitemInfo, setBillBookItemInfo] = useState([])

    const { billBookId } = useParams()

    const getBillBookInfo = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/billBook/single/${billBookId}`, {
                withCredentials: true
            }).then(response => {
                console.log(response.data);
                setBillBookinfo(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const getBillBookItemInfo = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/billBook/billBook-item/all/${billBookId}`, {
                withCredentials: true
            }).then(response => {
                console.log(response.data);
                setBillBookItemInfo(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getBillBookInfo();
        getBillBookItemInfo()
    }, [])

    const columnsBillBookItem = [
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
                            BillBook Information
                        </div> */}
                            <div className="top-1">
                                <div className="itemInfo">
                                    <div className="itemID">
                                        <span className="proKey">
                                            Bill Book Name:
                                        </span>
                                        <span className="proValue">
                                            {billBookinfo.billBookName}
                                        </span>
                                    </div>
                                    <div className="itemName">
                                        <span className="proKey">
                                            Bill Book Type:
                                        </span>
                                        <span className="proValue">
                                            {billBookinfo.billBookType}
                                        </span>
                                    </div>
                                    <div className="itemQunatity">
                                        <span className="proKey">
                                            Bill Book Description:
                                        </span>
                                        <span className="proValue">
                                            {billBookinfo.billBookDescription}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="top-1">
                                <div className="itemInfo">
                                    <div className="itemID">
                                        <span className="proKey">
                                            Bill Book Starting Number:
                                        </span>
                                        <span className="proValue">
                                            {billBookinfo.billBookStartingNumber}
                                        </span>
                                    </div>
                                    <div className="itemName">
                                        <span className="proKey">
                                            Number of Bills:
                                        </span>
                                        <span className="proValue">
                                            {billBookinfo.numberOfBills}
                                        </span>
                                    </div>
                                    <div className="itemQunatity">
                                        <span className="proKey">
                                            Financial Year:
                                        </span>
                                        <span className="proValue">
                                            {billBookinfo.financialYear}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="bottom">
                        <div className="bcontainer">
                            <div className="itemsSoldBy">
                                <Table columnsData={columnsBillBookItem} rowData={billBookitemInfo} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleBillBook