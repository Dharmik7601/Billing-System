import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import Sidebar from '../../../components/SideBar/Sidebar'
import { Widgets } from '../../../components/Widgets/Widgets'
import './Dashboard.scss'
import InventoryIcon from '@mui/icons-material/Inventory';
import DataTable from '../../../components/DataTables/DataTable'

function Home() {

    const inputs = [
        {
            title : 'Products',
            link: 'See All Products',
            number: 1000,
            logo: <InventoryIcon />
        },
        {
            title : 'Party',
            link: 'See All Party',
            number: 67,
            logo: <InventoryIcon />
        },
        {
            title : 'Bills',
            link: 'See All Bill',
            number: 10,
            logo: <InventoryIcon />
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