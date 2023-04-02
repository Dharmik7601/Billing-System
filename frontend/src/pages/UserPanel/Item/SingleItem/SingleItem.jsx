import React, { useCallback, useEffect,useState } from 'react'
import DataTable from '../../../../components/DataTables/DataTable'
import NavBar from '../../../../components/NavBar/NavBar'
import Sidebar from '../../../../components/SideBar/Sidebar'
import "./SingleProduct.scss"
import axios from "axios"
import { useParams } from 'react-router-dom'
import Table from "../../../../components/Tables/Table"

const SingleProduct = () => {

    const [productInfo, setProductInfo] = useState({})
    const [templateData, setTemplateData] = useState([])
    const [soldByList,setSoldByList] = useState([])

    const { productId } = useParams()
    
    
    const getSingleProductInformation = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/product/single/${productId}`, {
                withCredentials:true
            }).then(response => {
                console.log(response.data);
                setProductInfo(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const getProductTemplates = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/product/template/getAll/${productId}`, {
                withCredentials:true
            }).then(response => {
                setTemplateData(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const getProductSoldBy = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/product/soldBy/getAll/${productId}`, {
                withCredentials:true
            }).then(response => {
                setSoldByList(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getSingleProductInformation();
        getProductTemplates();
        getProductSoldBy()
    },[])

    const columnsDataTemp = [
        {
            name: "TEMPLATE NAME",
            selector: (row) => row.templateName,
            sortable: true
        },
    ];

    const columnsDataSoldBy = [
        {
            name: "SOLD BY",
            selector: (row) => row.supplierName,
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
                            <div className="title">
                                {productInfo.productName}
                        </div>
                        <div className="productInfo">
                            <div className="productID">
                                <span className="proKey">
                                    Product ID:
                                </span>
                                <span className="proValue">
                                    {productInfo.productId}
                                </span>
                            </div>
                            <div className="productQunatity">
                                <span className="proKey">
                                    Product Description:
                                </span>
                                <span className="proValue">
                                    {productInfo.productDescription}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                </div>
                    <div className="bottom">
                        <div className="left">
                            <div className="bleftcontainer">
                                <div className="productsSoldBy">
                                    <Table columnsData={columnsDataTemp} rowData={templateData} />
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="brightcontainer">
                                <div className="productsSoldBy">
                                    <Table columnsData={columnsDataSoldBy} rowData={soldByList} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct