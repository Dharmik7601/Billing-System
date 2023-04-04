
import React, { useEffect, useState } from 'react'
import Sidebar from "../../../../components/SideBar/Sidebar"
import Navbar from "../../../../components/NavBar/NavBar"
import './RegisterBillBook.scss'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios"

//MOBILE NUMBER VALIDATION//
function validateNumber(value) {
    let error = ''
    let status = true
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



const fieldValidations = {
    billBookStartNumber: validateNumber,
    noOfBills: validateNumber,
}


function RegisterBillBook() {

    const billBookType = [
        "Estimate",
        "Retial",
        "Tax Invoice"
    ]


    useEffect(() => {
        setFinancialYears()
    }, [])

    const [financialYear, setFinancialYear] = useState([])


    const setFinancialYears = async () => {
        var financialyear = [];
        var today = new Date();
        for (let i = 0; i < 3; i++) {
            if (i === 0) {
                if ((today.getMonth() + 1) <= 3) {
                    financialyear.push((today.getFullYear() - 1) + "-" + today.getFullYear())
                    financialyear.push(today.getFullYear() + "-" + (today.getFullYear() + 1))
                } else {
                    financialyear.push(today.getFullYear() + "-" + (today.getFullYear() + 1))
                }
            }
            else {
                financialyear.push((today.getFullYear() + i) + "-" + (today.getFullYear() + i + 1))
            }
            setFinancialYear(financialyear)
        }
    }


    const [data, setData] = useState({
        billBookName: '',
        billBookDescription: '',
        billBookType: '',
        billBookStartNumber: '',
        noOfBills: '',
        financialYear: '',
    })

    const [validate, setValidate] = useState({})

    const [error, setError] = useState({
        billBookStartNumber: '',
        noOfBills: '',
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
            billBookName: '',
            billBookDescription: '',
            billBookType: '',
            billBookStartNumber: '',
            noOfBills: '',
            financialYear: '',
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
            await axios.post(`${process.env.REACT_APP_LINK}/bill-book/create`, data, {
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
        <div className='registerBillBook'>
            <Sidebar />
            <div className="registerBillBookContainer">
                <Navbar />
                <div className="addContainer">
                    <div className="inputContainer">
                        <div className="title">
                            <h1>Add Bill Book</h1>
                        </div>
                        <Box
                            component="form"
                            sx={{ '& .MuiTextField-root': { m: 2, width: '30ch' }, }}
                            autoComplete="off">
                            <div className='row1'>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Bill Book Name"
                                    type={Text}
                                    name="billBookName"
                                    value={data.billBookName}
                                    onChange={handleChange}
                                    {...(validate.billBookName && { error: true, helperText: validate.billBookName })}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Bill Book Description"
                                    multiline
                                    maxRows={4}
                                    type={'text'}
                                    name="billBookDescription"
                                    value={data.billBookDescription}
                                    onChange={handleChange}
                                    {...(validate.billBookDescription && { error: true, helperText: validate.billBookDescription })}
                                />
                            </div>
                            <div className="row2">
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Bill Book Type"
                                    type={Text}
                                    select
                                    name="billBookType"
                                    value={data.billBookType}
                                    onChange={handleChange}
                                    {...(validate.billBookType && { error: true, helperText: validate.billBookType })}
                                >
                                    {billBookType.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    required
                                    id="outlined-multiline-flexible"
                                    label="Bill Book Starting Number"
                                    type={Number}
                                    size='medium'
                                    name="billBookStartNumber"
                                    value={data.billBookStartNumber}
                                    onChange={handleChange}
                                    {...(error.billBookStartNumber && { error: true, helperText: error.billBookStartNumber })}
                                    {...(validate.billBookStartNumber && { error: true, helperText: validate.billBookStartNumber })}
                                />
                            </div>
                            <div className="row3">
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Number of Bills"
                                    type={Number}
                                    name="noOfBills"
                                    value={data.noOfBills}
                                    onChange={handleChange}
                                    {...(error.noOfBills && { error: true, helperText: error.noOfBills })}
                                    {...(validate.noOfBills && { error: true, helperText: validate.noOfBills })}
                                />
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Financial Year"
                                    required
                                    type={Text}
                                    name="financialYear"
                                    onChange={handleChange}
                                    {...(validate.financialYear && { error: true, helperText: validate.financialYear })}
                                    select
                                >
                                    {financialYear.map((year) => (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </TextField>
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

export default RegisterBillBook