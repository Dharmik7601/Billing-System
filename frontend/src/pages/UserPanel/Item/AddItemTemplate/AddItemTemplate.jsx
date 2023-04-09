import React, { useState, useEffect } from 'react'
import Sidebar from "../../../../components/SideBar/Sidebar"
import NavBar from "../../../../components/NavBar/NavBar"
import "./AddItemTemplate.scss"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';


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
    itemPrice: validateNumber,
    itemQuantity: validateNumber
}

function AddItemTemplate() {

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
        partyName: '',
        templateName: '',
        templateDescription: '',
        itemList:[]
    })

    const [itemNameList, setItemNameList] = useState([])
    const [partyNameList,setPartyNameList] = useState([])

    const [validate, setValidate] = useState({})

    const [itemDetailsListValidation, setItemDetailsListValidattion] = useState([
        {
            itemName: '',
            itemPrice: '',
            itemQuantity: '',
            itemQuantityType: ''
        }
    ])

    const [error, setError] = useState({
        itemPrice: '',
        itemQuantity: ''
    })

    const handleChange = (e) => {
        const {name,value} = e.target
        setData({
            ...data,
            [name]: value
        })
        console.log(data);
    }

    useEffect(() => {
        getItemsNameList()
        getPartyNameList()
    }, [])

    const getItemsNameList = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/item/name/getAll`, {
                withCredentials: true
            }).then(response => {
                setItemNameList(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const getPartyNameList = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/party/getAll/name`, {
                withCredentials: true
            }).then(response => {
                setPartyNameList(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const checkItemListValidate = async () => {
        let set = [...itemDetailsListValidation]
        let isItemDetailsEmpty = false
        for (let i = 0; i < itemDetailsList.length; i++){
            console.log(i);
            let itemValidation = {
                itemName: '',
                itemPrice: '',
                itemQuantity: '',
                itemQuantityType:''
            }
            for (let x in itemDetailsList[i]) {
                if (itemDetailsList[i][x] === '') {
                    itemValidation[x] = 'This field is required'
                    isItemDetailsEmpty = true
                }
            }
            console.log(itemValidation);
            
            console.log(set[i]);
            set[i] = itemValidation
            console.log(set[i]);
            
        }
        setItemDetailsListValidattion(set)
        return isItemDetailsEmpty
    }
    console.log("vvvvv", itemDetailsListValidation);

    const addReaminingDetails = async () => {
        await setData({
            ...data,
            itemList: itemDetailsList
        })
    }

    const handleSubmit = async (e) => {
        
        let checkIsItemDetailsEmpty = await checkItemListValidate()

        await addReaminingDetails()

        const verror = {
            templateName: '',
            templateDescription: '',
            partyName:''
        }
        e.preventDefault()
        let isFormEmpty = false;
        for (let x in data) {
            if (data[x] === '' && data[x] !== 'itemList') {
                isFormEmpty = true;
                verror[x] = 'This field is required'
            }
            console.log(verror);
        }
        console.log(error);
        if (isFormEmpty || checkIsItemDetailsEmpty) {
            await setValidate(verror)
            console.log(validate);
            alert('Please fill out the remaining details')
            return
        }


        
        try {
            await axios.post(`${process.env.REACT_APP_LINK}/item/add/template`, {
                partyName: data.partyName,
                templateName: data.templateName,
                templateDescription: data.templateDescription,
                itemList: itemDetailsList
            }, {
                withCredentials: true
            }).then(response => {
                alert(response.data.msg)
                window.location.reload()
                return
            })
        } catch (err) {
            console.log(err);
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }

    const [value, setValue] = useState([1]);
    const [itemDetailsList, setItemDetailsList] = useState([
        {
            itemName: '',
            itemPrice: '',
            itemQuantity: '',
            itemQuantityType: ''
        }
    ])

    const handleAdd = () => {
        const x = [...value, []]
        setValue(x)
        const y = [...itemDetailsList, {
            itemName: '',
            itemPrice: '',
            itemQuantity: '',
            itemQuantityType: ''
        }]
        setItemDetailsList(y)
        const z = [...itemDetailsListValidation, {
            itemName: '',
            itemPrice: '',
            itemQuantity: '',
            itemQuantityType: ''
        }]
        setItemDetailsListValidattion(z)
    }

    const isAvailable = async (itemName) => {
        for (let x = 0; x < value.length;x++) {
            if (value[x] === itemName) {
                return false
            }
        }
        return true
    }

    const handleRowChange = async (onChangeValue, i) => {
        let check = await isAvailable(onChangeValue.target.value)
        console.log(check);
        if (!check) {
            alert('Item already selected')
            return
        }
        await getItemDetails(onChangeValue.target.value,i)
        const inputdata = [...value]
        console.log(onChangeValue.target.value);
        inputdata[i] = onChangeValue.target.value;
        setValue(inputdata)
        console.log(value);
    }

    const handleItemDetails = async (e,i) => {
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
        let x = [...itemDetailsList]
        x[i][targetName] = valid.value
        setItemDetailsList(x)
        // setItemDetailsList({
        //     ...itemDetailsList,
        //     [targetName]: valid.value
        // })
        setData({
            ...data,
            itemList:itemDetailsList
        })
        console.log(itemDetailsList);
    }

    console.log("dadad", data);
    console.log("baaa", value);
    console.log("paaa",itemDetailsList);

    const getItemDetails = async (itemName,i) => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/item/get/details/${itemName}`, {
                withCredentials: true
            }).then(response => {
                console.log(response.data)
                const itemDetails = [...itemDetailsList]
                itemDetails[i] = response.data
                setItemDetailsList(itemDetails)
                
                // itemDetailsList.push(response.data)
                console.log(itemDetailsList);
            })
        } catch (err) {
            if (err.response) {
                console.log(err);
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
        setData({
            ...data,
            itemList:itemDetailsList
        })
    }


    const handleDelete = async (i,e) => {
        const deleteValue = await [...value];
        await deleteValue.splice(i, 1);
        setValue(deleteValue);
        const deletItemDetails = await [...itemDetailsList]
        await deletItemDetails.splice(i, 1)
        setItemDetailsList(deletItemDetails)
        const deletItemValidation = await [...itemDetailsListValidation]
        await deletItemValidation.splice(i, 1)
        setItemDetailsListValidattion(deletItemValidation)
    };


    return (
        <div className='addItemTempelate'>
            <Sidebar />
            <div className="aptContainer">
                <NavBar />
                <div className="templateContainer">

                    {/* STATIC BOX */}
                    <div className="inputContent">
                        <div className="title"><h1>ADD ITEM TEMPLATE</h1></div>
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
                                    {partyNameList.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
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
                                    name="templateDescription"
                                    multiline
                                    value={data.templateDescription}
                                    onChange={handleChange}
                                    {...(validate.templateDescription && { error: true, helperText: validate.templateDescription })}
                                // onChange={handleChange}
                                // {...(error.size && { error: true, helperText: error.size })}
                                // {...(validate.size && { error: true, helperText: validate.size })}
                                />

                            </div>

                        </Box>
                    </div>

                    {/* ADD BUTTON */}
                    <div className="addButton">
                        <div className='btn' onClick={handleAdd}>
                            <Button variant="primary" startIcon={<AddCircleOutlineIcon />}>
                                Add Item
                            </Button>
                        </div>
                    </div>

                    {/* DUPLICATE */}
                    {value.map((data, i) => {
                        //const disableRemove = value.length === 1;
                        return (
                            <>
                                <Box
                                    component="form"
                                    sx={{ '& .MuiTextField-root': { m: 2, width: '30ch' }, }}
                                    autoComplete="off">
                                    <div className="itemSelect">

                                        {/* TEXT FIELDS */}
                                        <div className="selectContent">
                                            <Box
                                                component="form"
                                                sx={{ '& .MuiTextField-root': { m: 2, width: '30ch' }, }}
                                                autoComplete="off">

                                                <TextField
                                                    required
                                                    className="map-field"
                                                    label="Item name"
                                                    type={Text}
                                                    name="itemName"
                                                    select
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={value[i]}
                                                    onChange={(onChangeValue) => handleRowChange(onChangeValue,i)}
                                                {...(itemDetailsListValidation[i].itemName && { error: true, helperText: itemDetailsListValidation[i].itemName })}
                                                >
                                                    {itemNameList.map((list) =>
                                                        <MenuItem key={list} value={list}>{list}</MenuItem>)}
                                                </TextField>
                                                <TextField
                                                    required
                                                    className="map-field"
                                                    label="Quantity"
                                                    type={Text}
                                                    name="itemQuantity"
                                                    value={itemDetailsList[i].itemQuantity}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                    onChange={(e) => handleItemDetails(e,i)}
                                                    {...(itemDetailsListValidation[i].itemQuantity && { error: true, helperText: itemDetailsListValidation[i].itemQuantity })}>
                                                    {/* {itemList.map((list) =>
                                                        <MenuItem key={list} value={list}>{list}</MenuItem>)} */}
                                                </TextField>
                                                <TextField
                                                    required
                                                    className="map-field"
                                                    label="Quantity Type"
                                                    type={Text}
                                                    name="itemQuantityType"
                                                    select
                                                    value={itemDetailsList[i].itemQuantityType}
                                                    defaultValue={''}
                                                    onChange={(e) => handleItemDetails(e,i)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    {...(itemDetailsListValidation[i].itemQuantityType && { error: true, helperText: itemDetailsListValidation[i].itemQuantityType })}>
                                                    {QuantityType.map((list) =>
                                                        <MenuItem key={list.value} value={list.value}>{list.label}</MenuItem>)}
                                                </TextField>
                                                <TextField
                                                    required
                                                    className="map-field"
                                                    label="Price Per Quantity"
                                                    type={Text}
                                                    name="itemPrice"
                                                    value={itemDetailsList[i].itemPrice}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={(e) => handleItemDetails(e,i)}
                                                    {...(itemDetailsListValidation[i].itemPrice && { error: true, helperText: itemDetailsListValidation[i].itemPrice })}>
                                                    {/* {itemList.map((list) =>
                                                        <MenuItem key={list} value={list}>{list}</MenuItem>)} */}
                                                </TextField>
                                            </Box>
                                        </div>

                                        {/* DELETE BUTTON */}
                                        <div
                                            onClick={(e) => handleDelete(i,e)}
                                            //disabled={disableRemove}
                                            style={{ display: value.length === 1 ? "none" : "block" }}
                                            className="removeButton">
                                            <Button variant="primary" startIcon={<DeleteIcon />}>
                                                Delete
                                            </Button>
                                            {/* {/* <DeleteOutlineIcon /> */}
                                        </div> 
                                    </div>
                                </Box>
                            </>
                        )
                    })}

                    {/* SUBMIT */}
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
    )
}

export default AddItemTemplate

























