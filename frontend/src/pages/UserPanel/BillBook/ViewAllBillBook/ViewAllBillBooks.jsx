import React, { useEffect, useState } from 'react'
import DataTable from '../../../../components/DataTables/DataTable'
import NavBar from '../../../../components/NavBar/NavBar'
import Sidebar from '../../../../components/SideBar/Sidebar'
import "./ViewAllBillBooks.scss"
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { checkAuth } from '../../../../components/AdditonalFunc/checkAuth'

function ViewAllBillBooks() {
    const Navigate = useNavigate()

    const isUser = async () => {
        let check = await checkAuth()
        if (!check) {
            Navigate("/")
            return
        }
    }

    const [billBookData, setBillBookData] = useState([])

    useEffect(() => {
        getBillBookDetails()
        isUser()
    }, [])

    const getBillBookDetails = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/bill-book/getAll`, {
                withCredentials: true
            }).then(response => {
                setBillBookData(response.data)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
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
                            Navigate(`/user/bill-book/all/bill-book-details/${cellValues.row.billBookName}`)
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