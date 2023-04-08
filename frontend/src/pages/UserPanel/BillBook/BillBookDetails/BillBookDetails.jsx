import React, { useEffect, useState } from 'react'
import DataTable from '../../../../components/DataTables/DataTable'
import NavBar from '../../../../components/NavBar/NavBar'
import Sidebar from '../../../../components/SideBar/Sidebar'
import "./BillBookDetails.scss"
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function BillBookDetails() {
    const Navigate = useNavigate()

    const [billBookData, setBillBookData] = useState([])

    useEffect(() => {
        getBillBookDetails()
    }, [])

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
        {
            field: 'id',
            headerName: 'ID',
            width: 60
        },
        {
            field: 'billID',
            headerName: 'Bill ID',
            width: 300,
            editable: false,
        },
        {
            field: 'billNumber',
            headerName: 'Bill Number',
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
                            Navigate(`/user/bill-book/all/bill-book-details/single-bill-book`)
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

export default BillBookDetails