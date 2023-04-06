import React, { useState, useEffect } from 'react'
import Sidebar from "../../../../components/SideBar/Sidebar"
import NavBar from "../../../../components/NavBar/NavBar"
import "./AddItemTempTest.scss"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function InputRow({ id, onDelete }) {
    const [inputs, setInputs] = useState({
        itemName: '',
        itemPrice: '',
        itemQuantity: '',
        itemQuantityType: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 2, width: '30ch' }, }}
            autoComplete="off">
            <div className="itemSelect">

                <div className="selectContent">

                    {/* TEXT FIELDS */}
                    <TextField
                        name="itemName" value={inputs.itemName} onChange={handleInputChange}
                        //value={data} onChange={e => handleRowChange(e, i)}
                        required
                        className="outlined-required"
                        label="Item name"
                        type={Text}
                    //name="itemName"
                    //select
                    //value={data.itemName}
                    //onChange={handleChange}
                    //{...(validate.itemName && { error: true, helperText: validate.itemName })}
                    >
                        {/* {itemList.map((list) =>
                                                    <MenuItem key={list} value={list}>{list}</MenuItem>)} */}
                    </TextField>
                    <TextField
                        name="itemQuantity" value={inputs.itemQuantity} onChange={handleInputChange}
                        //value={data} onChange={e => handleRowChange(e, i)}
                        required
                        className="outlined-required"
                        label="Quantity"
                        type={Text}
                    //name="quantity"
                    //select
                    //value={data.itemName}
                    //onChange={handleChange}
                    //{...(validate.itemName && { error: true, helperText: validate.itemName })}
                    >
                        {/* {itemList.map((list) =>
                                                    <MenuItem key={list} value={list}>{list}</MenuItem>)} */}
                    </TextField>
                    <TextField
                        name="itemQuantityType" value={inputs.itemQuantityType} onChange={handleInputChange}
                        //value={data} onChange={e => handleRowChange(e, i)}
                        required
                        className="outlined-required"
                        label="Quantity Type"
                        type={Text}
                        //name="quantityType"
                        select
                    //value={data.itemName}
                    //onChange={handleChange}
                    //{...(validate.itemName && { error: true, helperText: validate.itemName })}
                    >
                        {/* {itemList.map((list) =>
                                                    <MenuItem key={list} value={list}>{list}</MenuItem>)} */}
                    </TextField>
                    <TextField
                        name="itemPrice" value={inputs.itemPrice} onChange={handleInputChange}
                        //value={data} onChange={e => handleRowChange(e, i)}
                        required
                        className="outlined-required"
                        label="Price Per Quantity"
                        type={Text}
                        //name="pricePerQuantity"
                        select
                    //value={data.itemName}
                    //onChange={handleChange}
                    //{...(validate.itemName && { error: true, helperText: validate.itemName })}
                    >
                        {/* {itemList.map((list) =>
                                                    <MenuItem key={list} value={list}>{list}</MenuItem>)} */}
                    </TextField>

                    {/* DELETE BUTTON */}
                    <div
                        onClick={handleDelete}
                        //disabled={disableRemove}
                        //style={{ display: value.length === 1 ? "none" : "block" }}
                        className="removeButton">
                        <DeleteOutlineIcon />
                    </div>

                </div>
            </div>
        </Box>
    );
}

function AddItemTempTest() {

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

    const PartyName = [
        {
            label: "Party Name",
            value: "party_name"
        },
        {
            label: "Template Name",
            value: "temp_name"
        }, {
            label: "Template Description",
            value: "temp_description"
        },

    ]

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
        }, {
            label: "Tons",
            value: "tons"
        },

    ]

    const [data, setData] = useState({
        itemName: '',
        quantity: '',
        price: '',
        quantityType: '',
        size: '',
        templateName: ''
    })

    const [nameList, setNameList] = useState([])

    const [validate, setValidate] = useState({})

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
                [targetName]: valid.error
            })
        }
        console.log("HEre");
        setData({
            ...data,
            [targetName]: valid.value
        })
        console.log(data);
    }

    useEffect(() => {
        getItemsNameList()
    }, [])

    const getItemsNameList = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/item/name/getAll`, {
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
            itemName: '',
            quantity: '',
            price: '',
            size: '',
            quantityType: '',
            templateName: ''
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
            await axios.post(`${process.env.REACT_APP_LINK}/item/add/template`, {
                itemName: data.itemName,
                itemQuantity: data.quantity,
                itemQuantityType: data.quantityType,
                itemSize: data.size,
                templateName: data.templateName,
                itemPrice: data.price
            }, {
                withCredentials: true
            }).then(response => {
                console.log(response);
            })
        } catch (err) {
            console.log(err);
        }
    }

    const [rows, setRows] = useState([{ id: 1 }]);

    const handleAddRow = () => {
        setRows([...rows, { id: rows.length + 1 }]);
    };

    const handleDeleteRow = (id) => {
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
    };

    return (
        <div className='addItemTempelate'>
            <Sidebar />
            <div className="aptContainer">
                <NavBar />
                <div className="templateContainer">

                    {/* STATIC BOX */}
                    <div className="inputContent">
                        <div className="title"><h1>Add Item Template</h1></div>
                        <Box
                            component="form"
                            sx={{ '& .MuiTextField-root': { m: 2, width: '30ch' }, }}
                            autoComplete="off">

                            <div className="row1">

                                {/* Party Name */}
                                <TextField
                                    className="outlined-required"
                                    id="outlined-multiline-flexible"
                                    label="Party Name"
                                    required
                                    type={Text}
                                    name="partyName"
                                    onChange={handleChange}
                                    {...(validate.partyName && { error: true, helperText: validate.partyName })}
                                    select
                                >
                                    {/* {PartyName.map((type) => (
                                        <MenuItem key={type.value} value={type.value}>
                                            {type.label}
                                        </MenuItem>
                                    ))} */}
                                </TextField>

                                {/* Template Name */}
                                <TextField
                                    required
                                    className="outlined-required"
                                    label="Template Name"
                                    type={Text}
                                    name="templateName"
                                    value={data.templateName}
                                    multiline
                                    onChange={handleChange}
                                    {...(validate.templateName && { error: true, helperText: validate.templateName })}
                                />

                                {/* Template Description */}
                                <TextField
                                    required
                                    className="outlined"
                                    label="Template Description"
                                    type={Text}
                                    name="description"
                                    multiline
                                    value={data.size}
                                // onChange={handleChange}
                                // {...(error.size && { error: true, helperText: error.size })}
                                // {...(validate.size && { error: true, helperText: validate.size })}
                                />

                            </div>

                        </Box>
                    </div>

                    {/* ADD BUTTON */}
                    <div className="addButton">
                        <div className='btn'>
                            <Button size='large' variant='outlined' color='secondary' onClick={handleAddRow}>
                                Add Item
                            </Button>
                            {/* <h4>Add Item</h4><AddCircleOutlineIcon /> */}
                        </div>
                    </div>

                    {/* DUPLICATE ROW */}
                    {rows.map((row) => (
                        <InputRow key={row.id} id={row.id} onDelete={handleDeleteRow} />
                    ))}
                    {/* <button onClick={handleAddRow}>Add Row</button> */}

                    {/* SUBMIT BUTTON*/}
                    <div className="submit">
                        <div className="btn">
                            <Button size='large' variant='outlined' color='secondary' onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AddItemTempTest;