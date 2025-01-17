import React, { useState, useEffect } from 'react'
import Sidebar from "../../../../components/SideBar/Sidebar"
import NavBar from "../../../../components/NavBar/NavBar"
import "./GenerateInvoice.scss"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '../../../../components/Tables/Table';
import InvoiceTable from '../../../../components/InvoiceTable/InvoiceTable'
import { useNavigate } from 'react-router-dom';
import {checkAuth} from "../../../../components/AdditonalFunc/checkAuth"


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

function GenerateInvoice() {

    const Navigate = useNavigate()

    const isUser = async () => {
        let check = await checkAuth()
        if (!check) {
            Navigate("/")
            return
        }
    }

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

    const ShippingType = [
        'Air','Land','Sea'
    ]

    const [shippingNames,setShippingNames] = useState([])

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

    const [billBookList, setBillBookList] = useState([])
    const [billList, setBillList] = useState([])
    const [partyList, setPartyList] = useState([])
    const [itemNameList, setItemNameList] = useState([])
    const [templateData, setTemplateData] = useState({})


    //    PRODUCT & TEMPLATE NAME ROW DUPLICATION
    const [value, setValue] = useState([1]);
    const [itemDetailsList, setItemDetailsList] = useState([{
        itemName: '',
        itemPrice: '',
        itemQuantity: '',
        itemQuantityType: '',
        itemSize: ''
    }])

    const handleAdd = () => {
        const x = [...value, []]
        setValue(x)
        const y = [...itemDetailsList, {
            itemName: '',
            itemPrice: '',
            itemQuantity: '',
            itemQuantityType: '',
            itemSize: ''
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

    const checkItemListValidate = async () => {
        let set = [...itemDetailsListValidation]
        let isItemDetailsEmpty = false
        for (let i = 0; i < itemDetailsList.length; i++) {
            let itemValidation = {
                itemName: '',
                itemPrice: '',
                itemQuantity: '',
                itemQuantityType: ''
            }
            for (let x in itemDetailsList[i]) {
                if (itemDetailsList[i][x] === '') {
                    itemValidation[x] = 'This field is required'
                    isItemDetailsEmpty = true
                }
            }
            set[i] = itemValidation
        }
        setItemDetailsListValidattion(set)
        return isItemDetailsEmpty
    }

    const isAvailable = async (itemName) => {
        for (let x = 0; x < value.length; x++) {
            if (value[x] === itemName) {
                return false
            }
        }
        return true
    }

    const handleRowChange = async (onChangeValue, i) => {
        let check = await isAvailable(onChangeValue.target.value)
        if (!check) {
            alert('Item already selected')
            return
        }
        await getItemDetails(onChangeValue.target.value,data.partyName, i)
        const inputdata = [...value]
        inputdata[i] = onChangeValue.target.value;
        setValue(inputdata)
    }

    // const handleDelete = (i) => {
    //     if (value.length === 1) {
    //         return;
    //     }
    //     const deleteValue = [...value];
    //     deleteValue.splice(i, 1);
    //     setValue(deleteValue);
    // };

    const handleItemDetails = async (e, i) => {
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
        let x = [...itemDetailsList]
        x[i][targetName] = valid.value
        setItemDetailsList(x)
        // setItemDetailsList({
        //     ...itemDetailsList,
        //     [targetName]: valid.value
        // })
    }

    const getItemDetails = async (itemName,partyName, i) => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/item/get/details/invoice/${itemName}/${partyName}`, {
                withCredentials: true
            }).then(response => {
                const itemDetails = [...itemDetailsList]
                itemDetails[i] = response.data
                setItemDetailsList(itemDetails)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }

    const handleDelete = async (i) => {
        const deleteValue = await [...value];
        await deleteValue.splice(i, 1);
        setValue(deleteValue);
        const deletItemDetails = await [...itemDetailsList]
        await deletItemDetails.splice(i, 1)
        setItemDetailsList(deletItemDetails)
        const deletItemValidation = await [...itemDetailsListValidation]
        await deletItemValidation.splice(i, 1)
        setItemDetailsListValidattion(deletItemValidation)
    }

    useEffect(() => {
        isUser()
        partyNameList();
        getItemsNameList()
    }, [])

    const BillBookType = [
        {
            label: "Estimate",
            value: "Estimate"
        },
        {
            label: "Retail",
            value: "Retail"
        }, {
            label: "Tax Invoice",
            value: "Tax Invoice"
        },
    ]

    const [billDetails, setBillDetails] = useState({
        billBookNumber: '',
        billBookFinancialYear: ''
    })

    const [partyDetails, setPartyDetails] = useState({
        billingAddress: '',
        shippingAddress:''
    })

    const date = new Date();
    const futureDate = date.getDate();
    date.setDate(futureDate);
    const defaultValue = date.toLocaleDateString('en-CA');

    const [data, setData] = useState({
        billBookName: '',
        // billBookNumber: '',
        partyName: '',
        billBookType: '',
        // itemList: [],
        billDate: defaultValue,
        // billBookFinancialYear:'',
        // billingAddress: '',
        shippingName: '',
        shippingType: '',
        // shippingAddress:'',
        billDueDate: ''
    })

    const [validate, setValidate] = useState({})


    const getItemsNameList = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/item/name/getAll`, {
                withCredentials: true
            }).then(response => {
                setItemNameList(response.data)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }

    const billBooksList = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/bill-book/name/getAll`, {
                withCredentials: true
            }).then(response => {
                setBillBookList(response.data)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }

    const partyNameList = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/party/getAll/Name`, {
                withCredentials: true
            }).then(response => {
                setPartyList(response.data)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }

    // const getItemNameList = async (name) => {
    //     try {
    //         await axios.post(`${process.env.REACT_APP_LINK}/party/items/name`, {
    //             partyName: name
    //         }, {
    //             withCredentials: true
    //         }).then(response => {
    //             setItemNameList(response.data)
    //         })
    //     } catch (err) {
    //         if (err.response) {
    //             alert(err.response.data.msg)
    //             return
    //         }
    //         alert('Something went wrong')
    //     }
    // }

    // const getTemplateList = async (itemName) => {
    //     console.log(data.partyName);
    //     console.log(itemName);
    //     try {
    //         await axios.post(`${process.env.REACT_APP_LINK}/party-item/template/name`, {
    //             itemName: itemName,
    //             partyName: data.partyName
    //         }, {
    //             withCredentials: true
    //         }).then(response => {
    //             setTemplateData(response.data)
    //         })
    //     } catch (err) {
    //         if (err.response) {
    //             alert(err.response.data.msg)
    //             return
    //         }
    //         alert('Something went wrong')
    //     }
    // }

    

    const getBillBookNextBill = async (billBookName) => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/bill-book/get/next-bill/${billBookName}`, {
                withCredentials: true
            }).then(response => {
                // setBillList(response.data.availableBills)
                // setType(response.data.billBookType)
                setBillDetails({
                    ...billDetails,
                    billBookNumber: response.data.lastBill,
                    billBookFinancialYear: response.data.billBookFinancialYear
                })
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }

    const getBillBookNames = async (billBookType) => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/bill-book/name/getAll/${billBookType}`, {
                withCredentials: true
            }).then(response => {
                setBillBookList(response.data)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }

    const getShippingNames = async (shippingType) => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/shipping/get/All/names/${shippingType}`, {
                withCredentials: true
            }).then(response => {
                setShippingNames(response.data)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }

    const getPartyDetails = async (partyName) => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/party/get/details/${partyName}`, {
                withCredentials: true
            }).then(response => {
                setPartyDetails({
                    ...partyDetails,
                    billingAddress: response.data.partyAddress,
                    shippingAddress: response.data.partyAddress
                })
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }

    const handleChange = async (e) => {
        const targetName = e.target.name
        if (targetName === 'billBookType') {
            await getBillBookNames(e.target.value)
        }
        if (targetName === 'billBookName') {
            await getBillBookNextBill(e.target.value)
            // await setData({
            //     ...data,
            //     billNumber: number
            // })
        }
        if (targetName === 'shippingType') {
            await getShippingNames(e.target.value)
        }
        if (targetName === 'partyName') {
            await getPartyDetails(e.target.value)
        }
        if (targetName === 'billingAddress' || targetName === 'shippingAddress') {
            setPartyDetails({
                ...partyDetails,
                [targetName]: e.target.value
            })
            return
        }
        if (targetName === 'billDueDate') {
            let date = new Date(e.target.value)
            if (date < new Date(Date.now())) {
                alert('Bill due date should be on the day of invoice date or after that')
                return
            }
        }
        setData({
            ...data,
            [targetName]: e.target.value
        })
    }


    const handleSubmit = async (e) => {
    //     setData({
    //     ...data,
    //     billBookNumber: billDetails.lastBillNumber,
    //     billBookFinancialYear: billDetails.billBookFinancialYear,
    //     billingAddress: partyDetails.billingAddress,
    //     shippingAddress: partyDetails.shippingAddress,
    //     itemList: itemDetailsList
    // })
        let checkIsItemDetailsEmpty = await checkItemListValidate()
        const verror = {
            billBookName: '',
            billBookNumber: '',
            billBookType: '',
            partyName: '',
            billBookFinancialYear:'',
            billDate: '',
            billingAddress: '',
            shippingName: '',
            shippingType: '',
            shippingAddress: '',
            billDueDate: ''
        }
        e.preventDefault()
        let isFormEmpty = false;
        for (let x in data) {
            if (data[x] === '') {
                isFormEmpty = true;
                verror[x] = 'This field is required'
            }
        }
        for (let y in partyDetails) {
            if (partyDetails[y] === '') {
                isFormEmpty = true;
                verror[y] = 'This field is required'
            }
        }
        for (let z in billDetails) {
            if (billDetails[z] === '') {
                isFormEmpty = true;
                verror[z] = 'This field is required'
            }
        }
        // console.log(number);
        // if (number === '') {
        //     verror.billBookNumber = 'This field is required'
        // }
        if (isFormEmpty || checkIsItemDetailsEmpty) {
            await setValidate(verror)
            alert('Please fill out the remaining details')
            return
        }
        try {
            await axios.post(`${process.env.REACT_APP_LINK}/invoice/create`, {
                billBookName: data.billBookName,
                billBookNumber:billDetails.billBookNumber,
                billBookType: data.billBookType,
                partyName: data.partyName,
                billBookFinancialYear:billDetails.billBookFinancialYear,
                billDate: data.billDate,
                billingAddress: partyDetails.billingAddress,
                shippingName: data.shippingName,
                shippingType: data.shippingType,
                shippingAddress: partyDetails.shippingAddress,
                billDueDate: data.billDueDate,
                itemList: itemDetailsList
            }, {
                withCredentials: true
            }).then(response => {
                alert(response.data.msg)
                window.open(`/user/bill-book/invoice/${response.data.invoiceId}`)
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

    const columnsDataItemDetails = [
        {
            name: "ITEM NAME",
            selector: (row) => row.itemName,
            sortable: true
        },
        {
            name: "ITEM QUANTITY",
            selector: (row) => row.itemQuantity,
            sortable: true
        },
        {
            name: "ITEM QUANTITY TYPE",
            selector: (row) => row.itemQuantityType,
            sortable: true
        },
        {
            name: "ITEM PRICE",
            selector: (row) => row.itemPrice,
            sortable: true
        },
        // {
        //     name: "ITEM SIZE",
        //     selector: (row) => row.itemSize,
        //     sortable: true
        // },
    ];

    // DATA TABLE FUNCTIONS

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    return (
        <div className='generateInvoice'>
            <Sidebar />
            <div className="generateInvoiceContainer">
                <NavBar />
                <div className="inputContainer">

                    {/* TITLE */}
                    <div className="title"><h1>GENERATE INVOICE</h1></div>

                    {/* STATIC BOX */}


                    {/* UPDATING TABLE */}
                    <div className="itemDetailsTable">
                        {/* <Table columnsData={columnsDataItemDetails} rowData={itemDetailsList} /> */}
                        <InvoiceTable rowData={itemDetailsList} invoiceType={data.billBookType} />
                    </div>

                    <div className="invoiceContent">

                        <Box
                            component="form"
                            sx={{ '& .MuiTextField-root': { m: 2, width: '30ch' }, }}
                            autoComplete="off">

                            <div className="row1">

                                {/* BILL BOOK TYPE */}
                                <TextField
                                    className="outlined-required"
                                    label="Bill Book Type"
                                    type={Text}
                                    select
                                    name="billBookType"
                                    value={data.billBookType}
                                    onChange={handleChange}
                                    {...(validate.billBookType && { error: true, helperText: validate.billBookType })}
                                >
                                    {BillBookType.map((type) =>
                                        <MenuItem key={type.value} value={type.value}>
                                            {type.label}
                                        </MenuItem>
                                    )}
                                </TextField>

                                {/* BILL BOOK */}
                                <TextField
                                    required
                                    className="outlined-required"
                                    label="Bill Book"
                                    type={Text}
                                    name="billBookName"
                                    select
                                    value={data.billBookName}
                                    defaultValue='Choose'
                                    onChange={handleChange}
                                    {...(validate.billBookName && { error: true, helperText: validate.billBookName })}
                                >
                                    {billBookList.map((list) =>
                                        <MenuItem key={list} value={list}>{list}</MenuItem>
                                    )}
                                </TextField>

                                {/* BILL NUMBER */}
                                <TextField
                                    required
                                    className="outlined"
                                    label="Bill Number"
                                    type={Text}
                                    disabled={true}
                                    name="billBookNumber"
                                    value={billDetails.billBookNumber}
                                    {...(validate.billBookNumber && { error: true, helperText: validate.billBookNumber })}
                                >
                                </TextField>

                                {/* PARTY NAME */}
                                <TextField
                                    required
                                    className="outlined-required"
                                    label="Bill Date"
                                    type={'date'}
                                    name="billDate"
                                    defaultValue={data.billDate}
                                    value={data.billDate}
                                    onChange={handleChange}
                                >
                                </TextField>
                            </div>

                            <div className="row2">
                                <TextField
                                    required
                                    className="outlined-required"
                                    label="Bill Book Financial Year"
                                    type={Text}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="billBookFinancialYear"
                                    value={billDetails.billBookFinancialYear}
                                    {...(validate.billBookFinancialYear && { error: true, helperText: validate.billBookFinancialYear })}
                                >
                                </TextField>
                                <TextField
                                    required
                                    className="outlined-required"
                                    label="Party name"
                                    type={Text}
                                    name="partyName"
                                    select
                                    value={data.partyName}
                                    defaultValue='Choose'
                                    onChange={handleChange}
                                    {...(validate.partyName && { error: true, helperText: validate.partyName })}
                                >
                                    {partyList.map((list) =>
                                        <MenuItem key={list} value={list}>{list}</MenuItem>
                                    )}
                                </TextField>
                                <TextField
                                    required
                                    multiline
                                    className="outlined-required-long"
                                    label="Billing Address"
                                    type={Text}
                                    name="billingAddress"
                                    value={partyDetails.billingAddress}
                                    defaultValue='Choose'
                                    onChange={handleChange}
                                    {...(validate.billingAddress && { error: true, helperText: validate.billingAddress })}
                                >
                                </TextField>
                            </div>
                            <div className="row3">
                                <TextField
                                    required
                                    className="outlined-required"
                                    label="Bill Due Date"
                                    type={'date'}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name="billDueDate"
                                    value={data.billDueDate}
                                    {...(validate.billDueDate && { error: true, helperText: validate.billDueDate })}
                                >
                                </TextField>
                                <TextField
                                    required
                                    className="outlined-required-mid"
                                    label="Shipping Type"
                                    type={Text}
                                    name="shippingType"
                                    select
                                    value={data.shippingType}
                                    defaultValue='Choose'
                                    onChange={handleChange}
                                    {...(validate.shippingType && { error: true, helperText: validate.shippingType })}
                                >
                                    {ShippingType.map((type) =>
                                        <MenuItem key={type} value={type}>{type}</MenuItem>
                                    )}
                                </TextField>
                                <TextField
                                    required
                                    className="outlined-required-mid"
                                    label="Shipping Company Name"
                                    type={Text}
                                    select
                                    name="shippingName"
                                    value={data.shippingName}
                                    defaultValue='Choose'
                                    onChange={handleChange}
                                    {...(validate.shippingName && { error: true, helperText: validate.shippingName })}
                                >
                                    {shippingNames.map((name) =>
                                        <MenuItem key={name} value={name}>{name}</MenuItem>
                                    )}
                                </TextField>
                            </div>
                            <div className="row4">
                                <TextField
                                    required
                                    multiline
                                    className="outlined-required-long"
                                    label="Shipping Address"
                                    type={Text}
                                    name="shippingAddress"
                                    value={partyDetails.shippingAddress}
                                    defaultValue='Choose'
                                    onChange={handleChange}
                                    {...(validate.shippingAddress && { error: true, helperText: validate.shippingAddress })}
                                >
                                </TextField>
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

                    {/* DUPLICATE ROW */}
                    {value.map((data, i) => {
                        //const disableRemove = value.length === 1;
                        return (
                            <>
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
                                                onChange={(e) => handleRowChange(e, i)}
                                                {...(itemDetailsListValidation[i].itemName && { error: true, helperText: itemDetailsListValidation[i].itemName })}
                                            >
                                                {itemNameList.map((list) =>
                                                    <MenuItem key={list} value={list}>{list}</MenuItem>)}
                                            </TextField>
                                            <TextField
                                                required
                                                className="map-field"
                                                label="Item Quantity"
                                                type={Text}
                                                name="itemQuantity"
                                                value={itemDetailsList[i].itemQuantity}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => handleItemDetails(e, i)}
                                                {...(itemDetailsListValidation[i].itemQuantity && { error: true, helperText: itemDetailsListValidation[i].itemQuantity })}
                                            >
                                                {/* {itemList.map((list) =>
                                                    <MenuItem key={list} value={list}>{list}</MenuItem>)} */}
                                            </TextField>
                                            <TextField
                                                required
                                                className="map-field"
                                                label="Item Quantity Type"
                                                type={Text}
                                                name="itemQuantityType"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                select
                                                value={itemDetailsList[i].itemQuantityType}
                                                onChange={(e) => handleItemDetails(e, i)}
                                                {...(itemDetailsListValidation[i].itemQuantityType && { error: true, helperText: itemDetailsListValidation[i].itemQuantityType })}
                                                defaultValue={''}
                                            >
                                                {QuantityType.map((list) =>
                                                    <MenuItem key={list.value} value={list.value}>{list.label}</MenuItem>)}
                                            </TextField>
                                            <TextField
                                                required
                                                className="map-field"
                                                label="Initial Price Per Quantity"
                                                type={Text}
                                                name="itemPrice"
                                                value={itemDetailsList[i].itemPrice}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => handleItemDetails(e, i)}
                                                {...(itemDetailsListValidation[i].itemPrice && { error: true, helperText: itemDetailsListValidation[i].itemPrice })}
                                            >
                                                {/* {itemList.map((list) =>
                                                    <MenuItem key={list} value={list}>{list}</MenuItem>)} */}
                                            </TextField>

                                        </Box>
                                    </div>

                                    {/* BUTTONS */}
                                    <div
                                        onClick={() => handleDelete(i)}
                                        //disabled={disableRemove}
                                        style={{ display: value.length === 1 ? "none" : "block" }}
                                        className="removeButton">
                                        <Button variant="primary" startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                        {/* <DeleteOutlineIcon /> */}
                                    </div>


                                </div>
                            </>
                        )
                    })}

                    {/* SUBMIT BUTTON */}
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

export default GenerateInvoice





{/* DENSE DATA TABLE */ }
{/* <div className='dense-table' style={{ height: 400, width: '80%' }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='headers' >Dessert (100g serving)</TableCell>
                                        <TableCell className='headers' align="center">Calories</TableCell>
                                        <TableCell className='headers' align="center">Fat&nbsp;(g)</TableCell>
                                        <TableCell className='headers' align="center">Carbs&nbsp;(g)</TableCell>
                                        <TableCell className='headers' align="center">Protein&nbsp;(g)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{row.name}</TableCell>
                                            <TableCell align="center">{row.calories}</TableCell>
                                            <TableCell align="center">{row.fat}</TableCell>
                                            <TableCell align="center">{row.carbs}</TableCell>
                                            <TableCell align="center">{row.protein}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div> */}



















