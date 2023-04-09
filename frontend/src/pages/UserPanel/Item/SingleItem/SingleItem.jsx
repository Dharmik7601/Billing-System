import React, { useCallback, useEffect, useState } from 'react'
import DataTable from '../../../../components/DataTables/DataTable'
import NavBar from '../../../../components/NavBar/NavBar'
import Sidebar from '../../../../components/SideBar/Sidebar'
import "./SingleItem.scss"
import axios from "axios"
import { useParams } from 'react-router-dom'
import Table from "../../../../components/Tables/Table"
import { useNavigate } from 'react-router-dom'
import { checkAuth } from '../../../../components/AdditonalFunc/checkAuth'

const SingleItem = () => {
    const Navigate = useNavigate()
    const isUser = async () => {
        let check = await checkAuth()
        if (!check) {
            Navigate("/")
            return
        }
    }

    useEffect(() => {
        isUser()
    })

    const [itemInfo, setItemInfo] = useState({})
    const [templateData, setTemplateData] = useState([])
    const [soldByList, setSoldByList] = useState([])

    const { itemId } = useParams()


    const getSingleItemInformation = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/item/single/${itemId}`, {
                withCredentials: true
            }).then(response => {
                setItemInfo(response.data)
            })
        } catch (err) {
            if (err.response) {
                alert(err.reponse.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }

    // const getItemTemplates = async () => {
    //     try {
    //         await axios.get(`${process.env.REACT_APP_LINK}/item/template/getAll/${itemId}`, {
    //             withCredentials: true
    //         }).then(response => {
    //             setTemplateData(response.data)
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // const getItemSoldBy = async () => {
    //     try {
    //         await axios.get(`${process.env.REACT_APP_LINK}/item/soldBy/getAll/${itemId}`, {
    //             withCredentials: true
    //         }).then(response => {
    //             setSoldByList(response.data)
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    useEffect(() => {
        getSingleItemInformation();
        // getItemTemplates();
        // getItemSoldBy()
    }, [])

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
        <div className='singleItem'>
            <Sidebar />
            <div className="singleItemContainer">
                <NavBar />
                <div className="inputContainer">
                    <div className="top">
                        <div className="tcontainer">
                            <div className="title">
                                {itemInfo.itemName}
                            </div>
                            <div className="itemInfo">
                                <div className="itemID">
                                    <span className="proKey">
                                        Item ID:
                                    </span>
                                    <span className="proValue">
                                        {itemInfo.itemId}
                                    </span>
                                </div>
                                <div className="itemQunatity">
                                    <span className="proKey">
                                        Item Description:
                                    </span>
                                    <span className="proValue">
                                        {itemInfo.itemDescription}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="bottom">
                        {/* <div className="left">
                            <div className="bleftcontainer">
                                <div className="itemsSoldBy">
                                    <Table columnsData={columnsDataTemp} rowData={templateData} />
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="brightcontainer">
                                <div className="itemsSoldBy">
                                    <Table columnsData={columnsDataSoldBy} rowData={soldByList} />
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleItem