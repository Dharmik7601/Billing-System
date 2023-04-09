import React, { useEffect, useState } from 'react'
import DataTable from '../../../../components/DataTables/DataTable'
import NavBar from '../../../../components/NavBar/NavBar'
import Sidebar from '../../../../components/SideBar/Sidebar'
import "./ViewItems.scss"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { checkAuth } from '../../../../components/AdditonalFunc/checkAuth'


const ViewItems = () => {

    const Navigate = useNavigate()

    const isUser = async () => {
        let check = await checkAuth()
        if (!check) {
            Navigate("/")
            return
        }
    }

    const [itemsData, setItemsData] = useState([])

    useEffect(() => {
        getAllItemsData()
        isUser()
    }, [])

    const getAllItemsData = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/item/getAll`, {
                withCredentials: true
            }).then(response => {
                setItemsData(response.data)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }

    const columns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 60 
        },
        { 
            field: 'itemId', 
            headerName: 'Item ID', 
            width: 250 },
        {
            field: 'itemName',
            headerName: 'Item name',
            width: 150,
            editable: false,
        },
        {
            field: 'itemDescription',
            headerName: 'Item Description',
            width: 300,
            editable: false,
        },
        {
            field: 'noOfTemplates',
            headerName: 'No of Templates',
            type: 'number',
            width: 200,
            editable: false,
        },
        {
            field: "View",
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(event) => {
                            Navigate(`/user/item/single/${cellValues.row.itemId}`)
                        }}
                    >
                        View
                    </Button>
                );
            }
        },
    ];
    return (
        <div className='viewItems'>
            <Sidebar />
            <div className="vpContainer">
                <NavBar />
                <div className="dataTableContainer">
                    <div className="itemData">
                        <DataTable setData={itemsData} columns={columns} />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default ViewItems
