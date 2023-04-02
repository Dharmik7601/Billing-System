import React,{useEffect, useState} from 'react'
import NavBar from '../../../../components/NavBar/NavBar'
import Sidebar from '../../../../components/SideBar/Sidebar'
import "./AddProductTemplate.scss"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MenuItem } from '@mui/material';
import axios from 'axios';


//MOBILE NUMBER VALIDATION//
function validateNumber(value) {
    let error = ''
    let status = true
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
    price: validateNumber,
    quantity: validateNumber
}


function AddProductTemplate() {
    

    const QuantityType = [
        {
            label: "Number",
            value: "number"
        },
        {
            label: "Dozen",
            value: "12"
        }, {
            label: "KGs",
            value: "kgs"
        },{
            label: "Tons",
            value: "tons"
        },

    ]

    const [data, setData] = useState({
        productName: '',
        quantity: '',
        price: '',
        quantityType:'',
        size: '',
        templateName: ''
    })

    const [nameList,setNameList] = useState([])

    const [validate,setValidate] = useState({})

    const [error, setError] = useState({
        quantity: '',
        price: ''
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
                [targetName]:valid.error
            })
        }
        console.log("HEre");
        setData({
            ...data,
            [targetName]:valid.value
        })
        console.log(data);
    }

    useEffect(() => {
        getProductsNameList()
    },[])

    const getProductsNameList = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/product/name/getAll`, {
                withCredentials: true
            }).then(response => {
                setNameList(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        const verror = {
        productName: '',
        quantity: '',
        price: '',
        size: '',
        quantityType:'',
        templateName:''
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
            await axios.post(`${process.env.REACT_APP_LINK}/product/add/template`, {
                productName: data.productName,
                productQuantity: data.quantity,
                productQuantityType: data.quantityType,
                productSize: data.size,
                templateName: data.templateName,
                productPrice: data.price
            }, {
                withCredentials: true
            }).then(response => {
                console.log(response);
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="addProductTempelate">
            <Sidebar />
            <div className="aptContainer">
                <NavBar />
                <div className="templateContainer">
                    <div className="inputContainer">
                        <div className="title">
                            <h1>ADD PRODUCT TEMPLATE</h1>
                        </div>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 2, width: '30ch' }, }}
                        autoComplete="off">
                        <div className='row1'>
                            <TextField
                                className='productName'
                                required
                                id="outlined-required"
                                label="Product name"
                                type={Text}
                                name="productName"
                                select
                                value={data.productName}  
                                    onChange={handleChange}
                                defaultValue='Choose'
                                    {...(validate.productName && { error: true, helperText: validate.productName })}      
                                >
                                    {nameList.map((list) =>
                                        <MenuItem key={list} value={list}>{list}</MenuItem>
                                    )}
                                </TextField> 
                                <TextField
                                required
                                id="outlined-required"
                                label="Template Name"
                                type={Text}
                                name="templateName"
                                    value={data.templateName} 
                                multiline    
                                onChange={handleChange} 
                                    {...(validate.templateName && { error: true, helperText: validate.templateName })}      
                                />  
                            </div>
                            <div className="row2" style={{display:'flex'}} >
                                <div className="quantity">
                                    <TextField
                                        className='productQuantity'
                                        required
                                id="outlined-required"
                                label="Quantity"
                                type={Number}
                                name="quantity"
                                value={data.quantity} 
                                    onChange={handleChange}
                                    {...(error.quantity && { error: true, helperText: error.quantity })}
                                    {...(validate.quantity && { error: true, helperText: validate.quantity })}
                                />
                                
                                <TextField
                                    className='productQuantity'
                                    id="outlined-multiline-flexible"
                                    label="Quantity Type"
                                    required
                                    type={Text}
                                    name="quantityType"
                                    onChange={handleChange}
                                    {...(validate.quantityType && { error: true, helperText: validate.quantityType })}
                                    select
                                >
                                    {QuantityType.map((type) => (
                                        <MenuItem key={type.value} value={type.value}>
                                            {type.label}
                                        </MenuItem>
                                    ))}
                                    </TextField>
                                </div>
                                <TextField
                                    className='price'
                                required
                                id="outlined-required"
                                label="Price Per Quantity"
                                type={Number}
                                name="price"
                                multiline
                                value={data.price} 
                                    onChange={handleChange}
                                    {...(error.price && { error: true, helperText: error.price })}
                                    {...(validate.price && { error: true, helperText: validate.price })}
                                />
                            
                            </div>
                            <div className="row3">
                                <TextField
                                        required
                                id="outlined-required"
                                label="Product Size"
                                type={Text}
                                name="size"
                                multiline
                                value={data.size} 
                                    onChange={handleChange}
                                    {...(error.size && { error: true, helperText: error.size })}
                                    {...(validate.size && { error: true, helperText: validate.size })}
                                    />
                            </div>
                        </Box>
                        <div className="submit">
                            <div className="btn">
                                <Button size='large' variant='contained' onClick={handleSubmit}>
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

export default AddProductTemplate