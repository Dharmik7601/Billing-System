import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DataTable from '../../../../components/DataTables/DataTable'
import NavBar from '../../../../components/NavBar/NavBar'
import Sidebar from '../../../../components/SideBar/Sidebar'
import "./SingleParty.scss"
import axios from 'axios'
import Table from '../../../../components/Tables/Table'
import { checkAuth } from '../../../../components/AdditonalFunc/checkAuth'

function SingleParty() {
    const Navigate = useNavigate()

    const isUser = async () => {
        let check = await checkAuth()
        if (!check) {
            Navigate("/")
            return
        }
    }

    const [partyinfo, setPartyinfo] = useState({})
    const [partyitemInfo, setPartyItemInfo] = useState([])

    const { partyId } = useParams()

    const getPartyInfo = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/party/single/${partyId}`, {
                withCredentials: true
            }).then(response => {
                setPartyinfo(response.data)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }

    const getPartyItemInfo = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/party/party-item/all/${partyId}`, {
                withCredentials: true
            }).then(response => {
                setPartyItemInfo(response.data)
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
        getPartyInfo();
        getPartyItemInfo()
        isUser()
    }, [])

    const columnsPartyItem = [
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
                            Party Information
                        </div> */}
                            <div className="top-1">
                                <div className="itemInfo">
                                    <div className="itemID">
                                        <span className="proKey">
                                            Party Name:
                                        </span>
                                        <span className="proValue">
                                            {partyinfo.partyName}
                                        </span>
                                    </div>
                                    <div className="itemName">
                                        <span className="proKey">
                                            Mobile:
                                        </span>
                                        <span className="proValue">
                                            {partyinfo.partyMobile}
                                        </span>
                                    </div>
                                    <div className="itemQunatity">
                                        <span className="proKey">
                                            Email:
                                        </span>
                                        <span className="proValue">
                                            {partyinfo.partyEmail}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="top-1">
                                <div className="itemInfo">
                                    <div className="itemID">
                                        <span className="proKey">
                                            Party Type:
                                        </span>
                                        <span className="proValue">
                                            {partyinfo.partyType}
                                        </span>
                                    </div>
                                    <div className="itemName">
                                        <span className="proKey">
                                            GST number:
                                        </span>
                                        <span className="proValue">
                                            {partyinfo.partyGstNo}
                                        </span>
                                    </div>
                                    <div className="itemQunatity">
                                        <span className="proKey">
                                            Account Name:
                                        </span>
                                        <span className="proValue">
                                            {partyinfo.accountName}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="top-1">
                                <div className="itemInfo">
                                    <div className="itemID">
                                        <span className="proKey">
                                            Account number:
                                        </span>
                                        <span className="proValue">
                                            {partyinfo.accountNumber}
                                        </span>
                                    </div>
                                    <div className="itemName">
                                        <span className="proKey">
                                            IFSC code:
                                        </span>
                                        <span className="proValue">
                                            {partyinfo.ifscCode}
                                        </span>
                                    </div>
                                    <div className="itemQunatity">
                                        <span className="proKey">
                                            Party Address:
                                        </span>
                                        <span className="proValue">
                                            {partyinfo.partyAddress}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="bottom">
                        <div className="bcontainer">
                            <div className="itemsSoldBy">
                                <Table columnsData={columnsPartyItem} rowData={partyitemInfo} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleParty