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

    // const checkUser = async () => {
    //     let check = await checkAuth()
    //     if (!check) {
    //         Navigate('/')
    //         return
    //     }
    // }

    const [transportationData, setTransportationData] = useState([])

    // useEffect(() => {
    //     checkUser();
    //     getTransportationDetails();
    // }, [])

    const getTransportationDetails = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/transportation/getAll`, {
                withCredentials: true
            }).then(response => {
                console.log(response.data);
                setTransportationData(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    // const columns = [
    //     {
    //         field: 'id',
    //         headerName: 'ID',
    //         width: 60
    //     },
    //     {
    //         field: 'transportationName',
    //         headerName: 'Transportation name',
    //         width: 250,
    //         editable: false,
    //     },
    //     {
    //         field: 'transportationType',
    //         headerName: 'Transportation Type',
    //         type: 'text',
    //         width: 200,
    //         editable: false,
    //     },
    //     {
    //         field: 'mobile',
    //         headerName: 'Mobile number',
    //         width: 200,
    //         editable: false,
    //     },
    //     {
    //         field: 'email',
    //         headerName: 'Email',
    //         type: 'text',
    //         width: 250,
    //         editable: false,
    //     },
    //     {
    //         field: "View",
    //         renderCell: (cellValues) => {
    //             return (
    //                 <Button
    //                     variant="contained"
    //                     color="primary"
    //                     onClick={(event) => {
    //                         Navigate(`/user/transportation/single/${cellValues.row.transportationId}`)
    //                     }}
    //                 >
    //                     View
    //                 </Button>
    //             );
    //         }
    //     },
    // ];


    const columnsD = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            editable: true,
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: "View",
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(event) => {
                            Navigate(`/user/transportation/all/transport-info`)
                        }}
                    >
                        View
                    </Button>
                );
            }
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];


    return (
        <div className='viewItems'>
            <Sidebar />
            <div className="vpContainer">
                <NavBar />
                <div className="dataTableContainer">
                    <div className="prdouctData">
                        <DataTable columns={columnsD} setData={rows} />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default ViewTransportations
