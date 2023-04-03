import React from 'react'
import "./NavBar.scss"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';

function NavBar() {
    return (
        <div className='navbar'>
            <div className="wrapper">
                <div className="dropdowns">
                    <p>Hello</p>
                    <p>user</p>
                    <p>How</p>
                    <p>Are</p>
                    <p>You</p>
                </div>
                <div className="items">
                    <div className="item">
                        <AddOutlinedIcon className='icon'/>
                    </div>
                    <div className="item">
                        <SettingsOutlinedIcon className='icon'/>
                    </div>
                    <div className="item">
                        <HelpOutlineOutlinedIcon className='icon'/>
                    </div>
                    <div className="item">
                        <ContactPageOutlinedIcon className='icon'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar