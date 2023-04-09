import React, { useEffect, useState } from 'react'
import DataTable from '../../../../components/DataTables/DataTable'
import NavBar from '../../../../components/NavBar/NavBar'
import Sidebar from '../../../../components/SideBar/Sidebar'
import "./ViewParties.scss"
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { checkAuth } from "../../../../components/AdditonalFunc/checkAuth"

const ViewParties = () => {

    const Navigate = useNavigate()

    const isUser = async () => {
        let check = await checkAuth()
        if (!check) {
            Navigate("/")
            return
        }
    }


    const [partyData, setPartyData] = useState([])

    useEffect(() => {
        isUser();
        getPartyDetails();
    },[])

    const getPartyDetails = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/party/getAll`, {
                withCredentials: true
            }).then(response => {
                setPartyData(response.data)
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
        { field: 'id', headerName: 'ID', width: 60 },
        {
            field: 'partyName',
            headerName: 'Party name',
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
            headerName: 'PartyID',
            type: 'text',
            width: 300,
            editable: false,
        },
        {
            field: 'partyType',
            headerName: 'Party Type',
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



export default ViewParties
