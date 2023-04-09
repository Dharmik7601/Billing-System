import React, { useEffect } from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import Sidebar from '../../../components/SideBar/Sidebar'
import { Widgets } from '../../../components/Widgets/Widgets'
import './Dashboard.scss'
import InventoryIcon from '@mui/icons-material/Inventory';
import DataTable from '../../../components/DataTables/DataTable'
import CategoryIcon from '@mui/icons-material/Category';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { checkAuth } from "../../../components/AdditonalFunc/checkAuth"
import { useNavigate } from 'react-router-dom'


function Home() {

    const Navigate = useNavigate()

    useEffect(() => {
        isUser()
    })

    
    const isUser = async () => {
        let check = await checkAuth()
        if (!check) {
            Navigate("/")
            return
        }
    }

    const inputs = [
        {
            title : 'Items',
            link: 'See All Items',
            number: 1000,
            logo: <CategoryIcon />
        },
        {
            title : 'Parties',
            link: 'See All Parties',
            number: 67,
            logo: <AddBusinessIcon/>
        },
        {
            title : 'Bills',
            link: 'See All Bills',
            number: 10,
            logo: <AccountBalanceWalletOutlinedIcon />

        }
    ]
    return (
        <div className='homepage'>
            <Sidebar />
            <div className="homeContainer">
                <NavBar />
                <div className="inputContainer">
                <div className="widgets">
                    {inputs.map((input) => (
                        <Widgets  {...input} />
                    ))}
                </div>
                <div className="tableContainer">
                    <div className="table">
                        {/* <DataTable /> */}
                        </div>
                        </div>
                </div>
            </div>
        </div>    
    )
}

export default Home
