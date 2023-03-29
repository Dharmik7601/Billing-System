import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import DataTable from '../../../../components/DataTables/DataTable'
import NavBar from '../../../../components/NavBar/NavBar'
import Sidebar from '../../../../components/SideBar/Sidebar'
import "./SingleParty.scss"
import axios from 'axios'
import Table from '../../../../components/Tables/Table'

function SingleParty() {

    const [partyinfo, setPartyinfo] = useState({})
    const [partyproductInfo,setPartyProductInfo] = useState([])

    const {partyId} = useParams()

    const getPartyInfo = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/party/single/${partyId}`, {
                withCredentials: true
            }).then(response => {
                console.log(response.data);
                setPartyinfo(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const getPartyProductInfo = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/party/party-product/all/${partyId}`, {
                withCredentials: true
            }).then(response => {
                console.log(response.data);
                setPartyProductInfo(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getPartyInfo();
        getPartyProductInfo()
    },[])

    const columnsPartyProduct = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true
        },
        {
            name: "PRODUCT NAME",
            selector: (row) => row.productName,
            sortable: true
        },
        {
            name: "TEMPLATE NAME",
            selector: (row) => row.templateName,
            sortable: true
        },
    ];


    return (
        <div className='singleProduct'>
            <Sidebar />
            <div className="singleProductContainer">
                <NavBar />
                <div className="inputContainer">
                <div className="top">
                    <div className="tcontainer">
                        {/* <div className="title">
                            Party Information
                        </div> */}
                        <div className="top-1">
                            <div className="productInfo">
                                <div className="productID">
                                    <span className="proKey">
                                        Party Name:
                                    </span>
                                    <span className="proValue">
                                        {partyinfo.partyName}
                                    </span>
                                </div>
                                <div className="productName">
                                    <span className="proKey">
                                        Mobile:
                                    </span>
                                    <span className="proValue">
                                        {partyinfo.partyMobile}
                                    </span>
                                </div>
                                <div className="productQunatity">
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
                            <div className="productInfo">
                                <div className="productID">
                                    <span className="proKey">
                                        Party Type:
                                    </span>
                                    <span className="proValue">
                                        {partyinfo.partyType}
                                    </span>
                                </div>
                                <div className="productName">
                                    <span className="proKey">
                                        GST number:
                                    </span>
                                    <span className="proValue">
                                        {partyinfo.partyGstNo}
                                    </span>
                                </div>
                                <div className="productQunatity">
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
                            <div className="productInfo">
                                <div className="productID">
                                    <span className="proKey">
                                        Account number:
                                    </span>
                                    <span className="proValue">
                                        {partyinfo.accountNumber}
                                    </span>
                                </div>
                                <div className="productName">
                                    <span className="proKey">
                                        IFSC code:
                                    </span>
                                    <span className="proValue">
                                        {partyinfo.ifscCode}
                                    </span>
                                </div>
                                <div className="productQunatity">
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
                    <div className="productsSoldBy">
                        <Table columnsData={columnsPartyProduct} rowData={partyproductInfo} />
                        </div>
                    </div>
                </div>
                </div>
                </div>
        </div>
    )
}

export default SingleParty