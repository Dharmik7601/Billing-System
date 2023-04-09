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
                                    label="USERNAME"
                                    type={Text}
                                    name="userName"
                                    disabled="true"
                                    InputLabelProps={{
                                                    shrink: true,
                                                }}
                                />
                                {/* TRANSPORTATION TYPE */}
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Transportation Type"
                                    required
                                    type={Text}
                                    name="transportationType"                      
                                />
                            </div>

                            <div className="row2">

                                {/* TRANSPORTATION TYPE */}
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Transportation Description"
                                    required
                                    type={Text}
                                    name="transportationDescription"
                                />

                                {/* OFFICE ADDRESS */}
                                <TextField
                                    required
                                    id="outlined-multiline-flexible"
                                    label="Office Address"
                                    multiline
                                    maxRows={4}
                                    size='medium'
                                    name="address"
                                />
                            </div>

                            <div className="row3">

                                {/* GST NUMBER */}
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="GST number"
                                    type={Number}
                                    name="gstNo"
                                />

                                {/* EMAIL */}
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Email address"
                                    type={'email'}
                                    name="email"
                                />

                            </div>


                            <div className="row4">

                                {/* BANK ACCOUNT NUMBER */}
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Bank Account number"
                                    type={Number}
                                    name="accountNumber"
                                />

                                {/* PHONE NUMBER */}
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Phone number"
                                    type={Number}
                                    name="mobile"
                                />
                            </div>
                            <div className="row5">


                            </div>
                        </Box>
                        <div className="submit">
                            <div className="btn">
                                <Button size='large' variant='contained' color='secondary'>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails
