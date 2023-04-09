import React, { useEffect, useState } from 'react'
import Sidebar from "../../../components/SideBar/Sidebar"
import Navbar from "../../../components/NavBar/NavBar"
import './UserDetails.scss'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios"
import { checkAuth } from "../../../components/AdditonalFunc/checkAuth"


function UserDetails() {

    //    const checkUser = async () => {
    //         let check = await checkAuth()
    //         if (!check) {
    //             Navigate('/') 
    //             return
    //         }
    //     }

    //     useEffect(() => {
    //         checkUser()
    //     }, [])



    return (
        <div className='userDetails'>
            <Sidebar />
            <div className="userDetailsContainer">
                <Navbar />
                <div className="addContainer">
                    <div className="inputContainer">
                        <div className="title">
                            <h1>User Details</h1>
                        </div>
                        <Box
                            component="form"
                            sx={{ '& .MuiTextField-root': { m: 2, width: '30ch' }, }}
                            autoComplete="off">

                            <div className='row1'>
                                {/* USERNAME */}
                                <TextField
                                    id="outlined-required"
                                    label="Username"
                                    type={Text}
                                    name="username"
                                    disabled="true"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                {/* FULL NAME */}
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Full Name"
                                    required
                                    type={Text}
                                    name="fName + lName"
                                    disabled="true"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>

                            <div className="row2">

                                {/* PHONE NUMBER */}
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Phone number"
                                    type={Number}
                                    name="mobile"
                                    disabled="true"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                {/* EMAIL */}
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Email address"
                                    type={'email'}
                                    name="email"
                                    disabled="true"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                            </div>

                            <div className="row3">

                                {/* COMPANY NAME */}
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Company Name"
                                    required
                                    type={Text}
                                    name="companyName"
                                    disabled="true"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                {/* COMPANY ADDRESS */}
                                <TextField
                                    required
                                    id="outlined-multiline-flexible"
                                    label="Company Address"
                                    multiline
                                    maxRows={4}
                                    size='medium'
                                    name="companyAddress"
                                    disabled="true"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>

                            <div className="row4">

                                {/* COMPANY GST NUMBER */}
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Company GST Number"
                                    required
                                    type={Text}
                                    name="companyGstNumber"
                                    disabled="true"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                {/* COMPANY EMAIL */}
                                <TextField
                                    required
                                    id="outlined-multiline-flexible"
                                    label="Company Email"
                                    multiline
                                    maxRows={4}
                                    size='medium'
                                    name="companyEmail"
                                    disabled="true"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>

                            <div className="row5">

                                {/* BANK ACCOUNT NUMBER */}
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Bank Account number"
                                    type={Number}
                                    name="accountNumber"
                                    disabled="true"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                {/* IFSC CODE */}
                                <TextField
                                    required
                                    id="outlined-multiline-flexible"
                                    label="IFSC Code"
                                    name="ifscCode"
                                    disabled="true"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>

                            <div className='bottom-space'></div>
                        </Box>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails
