import React, { useEffect, useState } from 'react'
import Sidebar from "../../../../components/SideBar/Sidebar"
import Navbar from "../../../../components/NavBar/NavBar"
import './AddShipping.scss'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios"
import { checkAuth } from "../../../../components/AdditonalFunc/checkAuth"
import { useNavigate } from 'react-router-dom';

function validateName(value) {
    let error = ''
    let status = true
    for (let letter of value) {
        if (!isNaN(letter)) {
            error = "Note: Letter expected"
            status = false
            break
        }
    }
    return {
        status,
        value: value.toLocaleUpperCase(),
        error
    }
}

//MOBILE NUMBER VALIDATION//
function validateMobile(value) {
    let error = ''
    let status = true
    if (value.length < 10) {
        error = 'Note: Mobile number should be of exact 10 digits'
    }
    if (value.length > 10 || value.length === '') {
        status = false
        // error = 'Mobile: Cannot be empty or accept more than 10 digits'
    }
    for (let number of value) {
        if (isNaN(number)) {
            error = "Note: Number expected"
            status = false
            break
        }
    }
    return {
        status,
        value,
        error
    }
}

//EMAIL VALIDATION//
function validateEmail(value) {
    let error = ''
    let status = true
    if (!value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        // status = false
        error = 'Note: Please enter a valid email'
    }
    return {
        status,
        value,
        error
    }
}

function validateGstNo(value) {
    let error = ''
    let status = true
    if (!value.match(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)) {
        error = 'Note: Please enter a valid GST number'
    }
    return {
        status,
        value,
        error
    }
}

function validateIfscCode(value) {
    let error = ''
    let status = true
    if (!value.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) {
        error = 'Note: Please enter a valid IFSC code'
    }
    return {
        status,
        value,
        error
    }
}

function validateAccNumber(value) {
    let error = ''
    let status = true
    if (value.length < 9) {
        error = 'Note: Please enter a valid Account Number'
    }
    if (value.length > 18) {
        status = false
    }
    for (let number of value) {
        if (isNaN(number)) {
            error = "Note: Number expected"
            status = false
            break
        }
    }
    // if (!value.match(/^[0-9]{9,18}$/)) {
    //     status = false;
    //     error = 'Note: Please enter a valid Account Number'
    // }
    return {
        status,
        value,
        error
    }
}


const fieldValidations = {
    mobile: validateMobile,
    email: validateEmail,
    // gstNo: validateGstNo,
    // accountNumber: validateAccNumber,
}


function AddShipping() {

    const Navigate = useNavigate()

    // const checkUser = async () => {
    //     let check = await checkAuth()
    //     if (!check) {
    //         Navigate('/')
    //         return
    //     }
    // }

    // useEffect(() => {
    //     checkUser()
    // }, [])


    const ShippingType = [
        "Air","Land","Sea"
    ]

    const [data, setData] = useState({
        shippingName: '',
        shippingDescription:'',
        email: '',
        mobile: '',
        shippingOfficeAddress: '',
        gstNumber: '',
        accountNumber: '',
        shippingType: ''
    })

    const [validate, setValidate] = useState({})

    const [error, setError] = useState({
        email: '',
        mobile: '',
        gstNumber: '',
        accountNumber: '',
    })

    const handleChange = (e) => {
        const targetName = e.target.name
        let valid = { status: true, value: e.target.value }
        const validateFn = fieldValidations[targetName]
        if (typeof validateFn === "function") {
            valid = validateFn(valid.value) // boolean value
        }
        if (!valid.status) {
            setError({
                ...error,
                [targetName]: valid.error
            })
            return
        }
        else {
            setError({
                ...error,
                [targetName]: valid.error
            })
        }
        setData({
            ...data,
            [targetName]: valid.value
        })
    }

    const handleSubmit = async (e) => {
        const verror = {
            shippingName: '',
            shippingDescription:'',
            email: '',
            mobile: '',
            shippingOfficeAddress: '',
            gstNumber: '',
            accountNumber: '',
            shippingType: ''
        }
        e.preventDefault()
        let isFormEmpty = false;
        for (let x in data) {
            if (data[x] === '') {
                isFormEmpty = true;
                verror[x] = 'This field is required'
            }
        }
        if (isFormEmpty) {
            await setValidate(verror)
            alert('Please fill out the remaining details')
            return
        }
        if (error.accountNumber || error.email || error.gstNumber || error.mobile) {
            alert('Please fill out the correct details')
            return
        }
        try {
            await axios.post(`${process.env.REACT_APP_LINK}/shipping/create`, data, {
                withCredentials: true
            }).then(response => {
                alert(response.data.msg)
                window.location.reload()
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }


    return (
        <div className='addTransportation'>
            <Sidebar />
            <div className="addTransportationContainer">
                <Navbar />
                <div className="addContainer">
                    <div className="inputContainer">
                        <div className="title">
                            <h1>ADD SHIPPING</h1>
                        </div>
                        <Box
                            component="form"
                            sx={{ '& .MuiTextField-root': { m: 2, width: '30ch' }, }}
                            autoComplete="off">

                            <div className='row1'>
                                {/* TRANSPORTATION NAME */}
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Shipping Company Name"
                                    type={Text}
                                    name="shippingName"
                                    value={data.shippingName}
                                    onChange={handleChange}
                                    {...(validate.shippingName && { error: true, helperText: validate.shippingName })}
                                />
                                {/* TRANSPORTATION TYPE */}
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Shipping Type"
                                    required
                                    type={Text}
                                    name="shippingType"
                                    onChange={handleChange}
                                    {...(validate.shippingType && { error: true, helperText: validate.shippingType })}
                                    select
                                >
                                    {ShippingType.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            <div className="row2">

                                {/* TRANSPORTATION TYPE */}
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Shipping Description"
                                    required
                                    multiline
                                    type={Text}
                                    name="shippingDescription"
                                    onChange={handleChange}
                                    {...(validate.shippingDescription && { error: true, helperText: validate.shippingDescription })}
                                >
                                </TextField>

                                {/* OFFICE ADDRESS */}
                                <TextField
                                    required
                                    id="outlined-multiline-flexible"
                                    label="Shipping Office Address"
                                    multiline
                                    maxRows={4}
                                    name="shippingOfficeAddress"
                                    value={data.shippingOfficeAddress}
                                    onChange={handleChange}
                                    {...(validate.shippingOfficeAddress && { error: true, helperText: validate.shippingOfficeAddress })}
                                />
                            </div>

                            <div className="row3">

                                {/* GST NUMBER */}
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="GST number"
                                    type={Number}
                                    name="gstNumber"
                                    value={data.gstNumber}
                                    onChange={handleChange}
                                    {...(error.gstNumber && { error: true, helperText: error.gstNumber })}
                                    {...(validate.gstNumber && { error: true, helperText: validate.gstNumber })}
                                />

                                {/* EMAIL */}
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Email address"
                                    type={'email'}
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    {...(error.email && { error: true, helperText: error.email })}
                                    {...(validate.email && { error: true, helperText: validate.email })}
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
                                    value={data.accountNumber}
                                    onChange={handleChange}
                                    {...(error.accountNumber && { error: true, helperText: error.accountNumber })}
                                    {...(validate.accountNumber && { error: true, helperText: validate.accountNumber })}
                                />

                                {/* PHONE NUMBER */}
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Phone number"
                                    type={Number}
                                    name="mobile"
                                    value={data.mobile}
                                    onChange={handleChange}
                                    {...(error.mobile && { error: true, helperText: error.mobile })}
                                    {...(validate.mobile && { error: true, helperText: validate.mobile })}
                                />
                            </div>
                            <div className="row5">


                            </div>
                        </Box>
                        <div className="submit">
                            <div className="btn">
                                <Button size='large' variant='contained' color='secondary' onClick={handleSubmit}>
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

export default AddShipping