import React, { useEffect,useState } from 'react'
import DataTable from '../../../../components/DataTables/DataTable'
import NavBar from '../../../../components/NavBar/NavBar'
import Sidebar from '../../../../components/SideBar/Sidebar'
import "./ViewAllBillBooks.scss"
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function ViewAllBillBooks() {
    const Navigate = useNavigate()

    const [billBookData, setBillBookData] = useState([])
    
    useEffect(() => {
        getBillBookDetails()
    },[])

    const getBillBookDetails = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/bill-book/getAll`, {
                withCredentials: true
            }).then(response => {
                console.log(response.data);
                setBillBookData(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const columnsBillBook = [
    { field: 'id', headerName: 'ID', width: 60 },
        {
        field: 'billBookName',
        headerName: 'Bill Book name',
        width: 200,
        editable: false,
    },
    {
        field: 'billBookType',
        headerName: 'Bill Book Type',
        width: 200,
        editable: false,
    },
    {
        field: 'billBookStartNumber',
        headerName: 'Starting Number',
        type: 'text',
        width: 150,
        editable: false,
    },
    {
        field: 'noOfBills',
        headerName: 'No of Bills',
        type: 'text',
        width: 150,
        editable: false,
        },
    {
        field: 'availableBills',
        headerName: 'Available Bills',
        type: 'text',
        width: 150,
        editable: false,
        },
        {
        field: 'financialYear',
        headerName: 'Financial Year',
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
        <div className='viewBillBooks'>
            <Sidebar />
            <div className="viewBillBooksContainer">
                <NavBar />
                <div className="dataTableContainer">
                    <div className="prdouctData">
                        <DataTable columns={columnsBillBook} setData={billBookData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewAllBillBooks