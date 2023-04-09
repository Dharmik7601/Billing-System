import React, { useEffect, useState } from 'react'
import Sidebar from "../../../../components/SideBar/Sidebar"
import Navbar from "../../../../components/NavBar/NavBar"
import './AddItem.scss'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MenuItem } from '@mui/material';
import axios from "axios"
import { checkAuth } from "../../../../components/AdditonalFunc/checkAuth"
import { useNavigate } from 'react-router-dom';


//MOBILE NUMBER VALIDATION//
function validateNumber(value) {
    let error = ''
    let status = true
    // if (value.length < 10) {
    //     error= 'Note: Mobile number should be of exact 10 digits'
    // }
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

const fieldValidations = {
    itemPrice: validateNumber,
    itemQuantity: validateNumber
}


function AddItem() {

    const Navigate = useNavigate()

    const isUser = async () => {
        let check = await checkAuth()
        if (!check) {
            Navigate("/")
            return
        }
        Navigate('/user/item/add')
    }

    useEffect(() => {
        isUser()
    }, [])

    const QuantityType = [
        {
            label: "Number",
            value: "number"
        },
        {
            label: "Dozen",
            value: "dozen"
        }, {
            label: "KGs",
            value: "kgs"
        }, {
            label: "Tons",
            value: "tons"
        },

    ]

    const [data, setData] = useState({
        itemName: '',
        itemDescription: '',
        itemQuantity: '',
        itemPrice: '',
        itemSize: '',
        itemQuantityType: ''
    })

    const [validate, setValidate] = useState({})

    const [error, setError] = useState({
        quantity: '',
        price: ''
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
            itemName: '',
            itemQuantity: '',
            itemPrice: '',
            itemSize: '',
            itemQuantityType: '',
            itemDescription: '',
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

        try {
            await axios.post(`${process.env.REACT_APP_LINK}/item/create`,data, {
                withCredentials: true
            }).then(response => {
                alert(response.data.msg)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
        window.location.reload()
    }

    return (
        <div className='addItem'>
            <Sidebar />
            <div className="addItemContainer">
                <Navbar />
                <div className="addContainer">
                    <div className="inputContainer">
                        <div className="title">
                            <h1>ADD ITEM</h1>
                        </div>
                        <Box
                            component="form"
                            sx={{ '& .MuiTextField-root': { m: 2, width: '30ch' }, }}
                            autoComplete="off">
                            <div className='row1'>
                                <TextField
                                    required
                                    className="outlined-required"
                                    label="Item name"
                                    type={Text}
                                    name="itemName"
                                    value={data.itemName}
                                    onChange={handleChange}
                                    {...(validate.itemName && { error: true, helperText: validate.itemName })}
                                />
                                <TextField
                                    required
                                    className="outlined-required2"
                                    label="Item Description"
                                    type={Text}
                                    name="itemDescription"
                                    value={data.itemDescription}
                                    multiline
                                    onChange={handleChange}
                                    {...(validate.itemDescription && { error: true, helperText: validate.itemDescription })}
                                />
                                <TextField
                                    required
                                    className="outlined-required"
                                    label="Item Size"
                                    type={Text}
                                    name="itemSize"
                                    multiline
                                    value={data.itemSize}
                                    onChange={handleChange}
                                    {...(error.itemSize && { error: true, helperText: error.itemSize })}
                                    {...(validate.itemSize && { error: true, helperText: validate.itemSize })}
                                />
                            </div>
                            <div className="row2" style={{ display: 'flex' }} >
                                <div className="quantity">
                                    <TextField
                                        className='itemQuantity'
                                        required
                                        // id="outlined-required"
                                        label="Quantity"
                                        type={Number}
                                        name="itemQuantity"
                                        value={data.itemQuantity}
                                        onChange={handleChange}
                                        {...(error.itemQuantity && { error: true, helperText: error.itemQuantity })}
                                        {...(validate.itemQuantity && { error: true, helperText: validate.itemQuantity })}
                                    />

                                    <TextField
                                        className='itemQuantity'
                                        // id="outlined-multiline-flexible"
                                        label="Quantity Type"
                                        required
                                        type={Text}
                                        name="itemQuantityType"
                                        onChange={handleChange}
                                        {...(validate.itemQuantityType && { error: true, helperText: validate.itemQuantityType })}
                                        select
                                    >
                                        {QuantityType.map((type) => (
                                            <MenuItem key={type.value} value={type.value}>
                                                {type.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        required
                                        className="outlined-required"
                                        label="Initial Price Per Quantity"
                                        type={Number}
                                        name="itemPrice"
                                        multiline
                                        value={data.itemPrice}
                                        onChange={handleChange}
                                        {...(error.itemPrice && { error: true, helperText: error.itemPrice })}
                                        {...(validate.itemPrice && { error: true, helperText: validate.itemPrice })}
                                    />
                                </div>


                            </div>
                            <div className="row3">

                            </div>
                        </Box>
                        <div className="submit">
                            <div className="btn">
                                <Button className="click" size='large' variant='contained' color='secondary' onClick={handleSubmit}>
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

export default AddItem
