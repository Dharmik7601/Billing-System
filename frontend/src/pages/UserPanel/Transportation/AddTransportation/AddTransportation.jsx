import React, { useEffect, useState } from 'react'
import Sidebar from "../../../../components/SideBar/Sidebar"
import Navbar from "../../../../components/NavBar/NavBar"
import './AddTransportation.scss'
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
    // transportationName: validateName,
    mobile: validateMobile,
    email: validateEmail,
    // gstNo: validateGstNo,
    // ifscCode: validateIfscCode,
    // accountNumber: validateAccNumber,
    // accountName: validateName
}


function AddTransportation() {

    const Navigate = useNavigate()

     const checkUser = async () => {
         let check = await checkAuth()
         if (!check) {
             Navigate('/')
             return
         }
     }

     useEffect(() => {
         checkUser()
     }, [])

    const bankAccountType = [
        {
            label: "Savings",
            value: "savings"
        },
        {
            label: "Current",
            value: "current"
        }, {
            label: "Over Draft",
            value: "overDraft"
        }
    ]

    const TransportationType = [
        {
            label: "Supplier",
            value: "supplier"
        },
        {
            label: "Buyer",
            value: "buyer"
        }, {
            label: "Both",
            value: "both"
        }
    ]

    const [data, setData] = useState({
        transportationName: '',
        email: '',
        mobile: '',
        address: '',
        gstNo: '',
        ifscCode: '',
        accountName: '',
        accountNumber: '',
        accountType: '',
        transportationType: ''
    })

    const [validate, setValidate] = useState({})

    const [error, setError] = useState({
        transportationName: '',
        email: '',
        mobile: '',
        address: '',
        gstNo: '',
        ifscCode: '',
        accountName: '',
        accountNumber: ''
    })

    const handleChange = (e) => {
        const targetName = e.target.name
        console.log(e.target.value);
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
            console.log(targetName)
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
            transportationName: '',
            email: '',
            mobile: '',
            address: '',
            gstNo: '',
            ifscCode: '',
            accountName: '',
            accountNumber: '',
            accountType: '',
            transportationType: ''
        }
        e.preventDefault()
        let isFormEmpty = false;
        for (let x in data) {
            if (data[x] === '') {
                isFormEmpty = true;
                verror[x] = 'This field is required'
            }
            console.log(verror);
        }
        console.log(error);
        if (isFormEmpty) {
            await setValidate(verror)
            console.log(validate);
            alert('Please fill out the remaining details')
            return
        }
        try {
            await axios.post(`${process.env.REACT_APP_LINK}/transportation/create`, data, {
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
                            <h1>Add Transportation</h1>
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
                                    label="Transportation name"
                                    type={Text}
                                    name="transportationName"
                                    value={data.transportationName}
                                    onChange={handleChange}
                                    {...(error.transportationName && { error: true, helperText: error.transportationName })}
                                    {...(validate.transportationName && { error: true, helperText: validate.transportationName })}
                                />
                                {/* TRANSPORTATION TYPE */}
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Transportation Type"
                                    required
                                    type={Text}
                                    name="transportationType"
                                    onChange={handleChange}
                                    {...(validate.transportationType && { error: true, helperText: validate.transportationType })}
                                    select
                                >
                                    {TransportationType.map((type) => (
                                        <MenuItem key={type.value} value={type.value}>
                                            {type.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            <div className="row2">

                                {/* TRANSPORTATION TYPE */}
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Transportation Description"
                                    required
                                    type={Text}
                                    name="transportationDescription"
                                    onChange={handleChange}
                                    {...(validate.transportationDescription && { error: true, helperText: validate.transportationDescription })}
                                >
                                    {TransportationType.map((type) => (
                                        <MenuItem key={type.value} value={type.value}>
                                            {type.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                {/* OFFICE ADDRESS */}
                                <TextField
                                    required
                                    id="outlined-multiline-flexible"
                                    label="Office Address"
                                    multiline
                                    maxRows={4}
                                    size='medium'
                                    name="address"
                                    value={data.address}
                                    onChange={handleChange}
                                    {...(validate.address && { error: true, helperText: validate.address })}
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
                                    value={data.gstNo}
                                    onChange={handleChange}
                                    {...(error.gstNo && { error: true, helperText: error.gstNo })}
                                    {...(validate.gstNo && { error: true, helperText: validate.gstNo })}
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

export default AddTransportation
