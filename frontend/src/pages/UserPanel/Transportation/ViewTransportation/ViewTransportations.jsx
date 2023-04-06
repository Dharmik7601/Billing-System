import React, { useEffect, useState } from 'react'
import DataTable from '../../../../components/DataTables/DataTable'
import NavBar from '../../../../components/NavBar/NavBar'
import Sidebar from '../../../../components/SideBar/Sidebar'
import "./ViewTransportations.scss"
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { checkAuth } from "../../../../components/AdditonalFunc/checkAuth"

const ViewTransportations = () => {

    const Navigate = useNavigate()

    const checkUser = async () => {
        let check = await checkAuth()
        if (!check) {
            Navigate('/')
            return
        }
    }

    const [partyData, setTransportationData] = useState([])

    useEffect(() => {
        checkUser();
        getTransportationDetails();
    },[])

    const getTransportationDetails = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/party/getAll`, {
                withCredentials: true
            }).then(response => {
                console.log(response.data);
                setTransportationData(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        {
            field: 'partyName',
            headerName: 'Transportation name',
            width: 150,
            editable: false,
        },
        {
            field: 'partyMobile',
            headerName: 'Mobile number',
            width: 200,
            editable: false,
        },
        {
            field: 'partyEmail',
            headerName: 'Email',
            type: 'text',
            width: 200,
            editable: false,
        },
        {
            field: 'partyId',
            headerName: 'TransportationID',
            type: 'text',
            width: 300,
            editable: false,
        },
        {
            field: 'partyType',
            headerName: 'Transportation Type',
            type: 'text',
            width: 150,
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
                            Navigate(`/user/party/single/${cellValues.row.partyId}`)
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
                    <div className="prdouctData">
                        <DataTable columns={columns} setData={partyData} />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default ViewTransportations
