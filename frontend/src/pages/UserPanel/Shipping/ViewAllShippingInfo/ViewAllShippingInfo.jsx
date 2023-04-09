import React, { useEffect, useState } from 'react'
import DataTable from '../../../../components/DataTables/DataTable'
import NavBar from '../../../../components/NavBar/NavBar'
import Sidebar from '../../../../components/SideBar/Sidebar'
import "./ViewAllShippingInfo.scss"
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { checkAuth } from "../../../../components/AdditonalFunc/checkAuth"

const ViewAllShippingInfo = () => {

    const Navigate = useNavigate()

    const isUser = async () => {
        let check = await checkAuth()
        if (!check) {
            Navigate("/")
            return
        }
    }

    const [shippingData, setShippingData] = useState([])

    useEffect(() => {
        isUser();
        getShippingDetails();
    }, [])

    const getShippingDetails = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/shipping/get/All`, {
                withCredentials: true
            }).then(response => {
                setShippingData(response.data)
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
            field: 'shippingId',
            headerName: 'Shipping ID',
            width: 250,
            editable: false,
        },
        {
            field: 'shippingName',
            headerName: 'Shipping Company name',
            width: 250,
            editable: false,
        },
        {
            field: 'shippingType',
            headerName: 'Shipping Type',
            type: 'text',
            width: 200,
            editable: false,
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'text',
            width: 250,
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
                            Navigate(`/user/shipping/single/info/${cellValues.row.shippingId}`)
                        }}
                    >
                        View
                    </Button>
                );
            }
        },
    ];


    // const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // ];


    return (
        <div className='viewItems'>
            <Sidebar />
            <div className="vpContainer">
                <NavBar />
                <div className="dataTableContainer">
                    <div className="prdouctData">
                        <DataTable columns={columns} setData={shippingData} />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default ViewAllShippingInfo
