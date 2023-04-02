import React, { useEffect,useState } from 'react'
import DataTable from '../../../../components/DataTables/DataTable'
import NavBar from '../../../../components/NavBar/NavBar'
import Sidebar from '../../../../components/SideBar/Sidebar'
import "./ViewProducts.scss"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'


const ViewProducts = () => {

    const Navigate =  useNavigate()

    const [productsData,setProductsData] = useState([])

    useEffect(() => {
        getAllProductsData()
    },[])

    const getAllProductsData = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/product/getAll`, {
                withCredentials: true
            }).then(response => {
                setProductsData(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'productId', headerName: 'Product ID', width: 250 },
    {
    field: 'productName',
    headerName: 'Product name',
    width: 150,
    editable: false,
  },
  {
    field: 'productDescription',
    headerName: 'Product Description',
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
                    Navigate(`/user/product/single/${cellValues.row.productId}`)
                }}
            >
            View
            </Button>
        );
        }
    },
];
    return (
        <div className='viewProducts'>
            <Sidebar />
            <div className="vpContainer">
                <NavBar />
                <div className="dataTableContainer">
                    <div className="prdouctData">
                        <DataTable setData={productsData} columns={columns} />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default ViewProducts
