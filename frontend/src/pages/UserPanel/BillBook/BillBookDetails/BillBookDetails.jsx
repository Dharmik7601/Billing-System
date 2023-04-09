import React, { useEffect, useState } from 'react'
import DataTable from '../../../../components/DataTables/DataTable'
import NavBar from '../../../../components/NavBar/NavBar'
import Sidebar from '../../../../components/SideBar/Sidebar'
import "./BillBookDetails.scss"
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

function BillBookDetails() {
    const Navigate = useNavigate()

    const {billBookName} = useParams()

    const [billsData, setBillsData] = useState([])

    useEffect(() => {
        getBillBookDetails()
    }, [])

    const getBillBookDetails = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/bill-book/get/bills/${billBookName}`, {
                withCredentials: true
            }).then(response => {
                setBillsData(response.data)
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
        {
            field: 'id',
            headerName: 'ID',
            width: 60
        },
        {
            field: 'billId',
            headerName: 'Bill ID',
            width: 300,
            editable: false,
        },
        {
            field: 'billBookNumber',
            headerName: 'Bill Number',
            width: 200,
            editable: false,
        },
        {
            field: 'billDate',
            headerName: 'Bill Date',
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
                            window.open(`/user/bill-book/invoice/${cellValues.row.billId}`)
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
                        <DataTable columns={columnsBillBook} setData={billsData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillBookDetails