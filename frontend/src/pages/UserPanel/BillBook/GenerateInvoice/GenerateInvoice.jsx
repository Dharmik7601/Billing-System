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

// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';


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
    // const []


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
        for (let i = 0; i < itemDetailsList.length; i++){
            console.log(i);
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
            console.log(itemValidation);
            
            console.log(set[i]);
            set[i] = itemValidation
            console.log(set[i]);
            
        }
        setItemDetailsListValidattion(set)
        return isItemDetailsEmpty
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

    // const handleDelete = (i) => {
    //     if (value.length === 1) {
    //         return;
    //     }
    //     const deleteValue = [...value];
    //     deleteValue.splice(i, 1);
    //     setValue(deleteValue);
    // };

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
        console.log(itemDetailsList);
    }

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
        // billBooksList();
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
    
    const [number, setNumber] = useState('')

    const [data, setData] = useState({
        billBookName: '',
        billBookNumber: '',
        partyName: '',
        billBookType: '',
        itemList:[]
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
            console.log(err);
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

    const getItemNameList = async (name) => {
        try {
            await axios.post(`${process.env.REACT_APP_LINK}/party/items/name`, {
                partyName: name
            }, {
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

    const getTemplateList = async (itemName) => {
        console.log(data.partyName);
        console.log(itemName);
        try {
            await axios.post(`${process.env.REACT_APP_LINK}/party-item/template/name`, {
                itemName: itemName,
                partyName: data.partyName
            }, {
                withCredentials: true
            }).then(response => {
                setTemplateData(response.data)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }

    const getBillBookNextBill = async (billBookName) => {
        let number 
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/bill-book/get/next-bill/${billBookName}`, {
                withCredentials: true
            }).then(response => {
                // setBillList(response.data.availableBills)
                // setType(response.data.billBookType)
                number = response.data
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
        setNumber(number)
    }

    const getBillBookNames = async (billBookType) => {
        try {
            await axios.get(`${process.env.REACT_APP_LINK}/bill-book/name/getAll/${billBookType}`, {
                withCredentials: true
            }).then(response => {
                setBillBookList(response.data)
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

    const handleChange = async (e) => {
        const targetName = e.target.name
        console.log(targetName);
        console.log(e.target.value);
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
        setData({
            ...data,
            [targetName] : e.target.value
        })
        console.log(data);
    }

    const handleSubmit = async (e) => {
        let checkIsItemDetailsEmpty = await checkItemListValidate()
        const verror = {
            billBookName: '',
            billBookNumber: '',
            billBookType: '',
            partyName: ''
        }
        e.preventDefault()
        let isFormEmpty = false;
        for (let x in data) {
            if (data[x] === '' && x!=='billBookNumber') {
                isFormEmpty = true;
                verror[x] = 'This field is required'
            }
            
            console.log(verror);
        }
        console.log(number);
        if (number === '') {
                verror.billBookNumber = 'This field is required'
            }
        if (isFormEmpty || checkIsItemDetailsEmpty) {
            await setValidate(verror)
            console.log(validate);
            alert('Please fill out the remaining details')
            return
        }

        setData({
            ...data,
            billBookNumber: number, 
            itemList: itemDetailsList
        })
        // try {
        //     await axios.post(`${process.env.REACT_APP_LINK}/party-item/create`, {
        //         data
        //     }, {
        //         withCredentials: true
        //     }).then(response => {
        //         console.log(response.data)
        //     })
        // } catch (err) {
        //     console.log(err);
        // }
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

                    {/* STATIC BOX */}
                    <div className="invoiceContent">
                        <div className="title"><h1>GENERATE INVOICE</h1></div>
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
                                    value={number}
                                    defaultValue='Choose'
                                    onChange={handleChange}
                                    {...(validate.billBookNumber && { error: true, helperText: validate.billBookNumber })}
                                >
                                    {billList.map((list) =>
                                        <MenuItem key={list} value={list}>{list}</MenuItem>
                                    )}
                                </TextField>

                                {/* PARTY NAME */}
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
                                                onChange={(e)=>handleRowChange(e,i)}
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
                                                onChange={(e)=>handleItemDetails(e,i)}
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
                                                onChange={(e)=>handleItemDetails(e,i)}
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
                                                onChange={(e)=>handleItemDetails(e,i)}
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

                    {/* DENSE DATA TABLE */}
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
                    <div className="itemDetailsTable">
                        <Table columnsData={columnsDataItemDetails} rowData={itemDetailsList} />
                    </div>
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

























