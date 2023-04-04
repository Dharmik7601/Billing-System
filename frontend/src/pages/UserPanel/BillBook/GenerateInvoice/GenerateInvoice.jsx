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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function GenerateInvoice() {

    const [billBookList, setBillBookList] = useState([])
    const [billList, setBillList] = useState([])
    const [partyList, setPartyList] = useState([])
    const [itemList, setItemList] = useState([])
    const [templateData, setTemplateData] = useState({})
    // const []


    //    PRODUCT & TEMPLATE NAME ROW DUPLICATION
    const [value, setValue] = useState([1]);

    const handleAdd = () => {
        const x = [...value, []]
        setValue(x)
    }

    const handleRowChange = (onChangeValue, i) => {
        const inputdata = [...value]
        inputdata[i] = onChangeValue.target.value;
        setValue(inputdata)
    }

    const handleDelete = (i) => {
        if (value.length === 1) {
            return;
        }
        const deleteValue = [...value];
        deleteValue.splice(i, 1);
        setValue(deleteValue);
    };

    // const handleDelete = (i) => {
    //     const deleteValue = [...value]
    //     deleteValue.splice(i, 1)
    //     setValue(deleteValue)
    // }

    useEffect(() => {
        billBooksList();
        partyNameList()
    }, [])

    const BillBookType = [
        {
            label: "Estimate",
            value: "estimate"
        },
        {
            label: "Retail",
            value: "retail"
        }, {
            label: "Tax Invoice",
            value: "tax_invoice"
        },
    ]

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
                setItemList(response.data)
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

    const getBillBookInfo = async (name) => {
        console.log(name);
        try {
            await axios.post(`${process.env.REACT_APP_LINK}/bill-book/type/bills`, {
                billBookName: name
            }, {
                withCredentials: true
            }).then(response => {
                setBillList(response.data.availableBills)
                setType(response.data.billBookType)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }

    const [type, setType] = useState()

    const [data, setData] = useState({
        billBookName: '',
        billNumber: '',
        partyName: '',
        itemName: '',
        itemTemplateName: '',
        billBookType: '',
    })

    const [validate, setValidate] = useState({})

    const handleChange = async (e) => {
        const targetName = e.target.name
        console.log(e.target.value);
        if (targetName === 'billBookName') {
            await getBillBookInfo(e.target.value)
            await setData({
                ...data,
                billBookType: type
            })
        }
        if (targetName === 'partyName') {
            await getItemNameList(e.target.value)
        }

        setData({
            ...data,
            [targetName]: e.target.value
        })
        if (targetName === 'itemName') {
            await getTemplateList(e.target.value)
        }
        console.log(data);
    }

    const handleSubmit = async (e) => {
        console.log(data);
        const verror = {
            partyName: '',
            itemName: '',
            itemTemplateName: '',
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
        if (isFormEmpty) {
            await setValidate(verror)
            console.log(validate);
            alert('Please fill out the remaining details')
            return
        }
        try {
            await axios.post(`${process.env.REACT_APP_LINK}/party-item/create`, {
                data
            }, {
                withCredentials: true
            }).then(response => {
                console.log(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }

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
                        <div className="title"><h1>Generate Invoice</h1></div>
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
                                    value={type}
                                    onChange={handleChange}
                                    {...(validate.partyName && { error: true, helperText: validate.partyName })}
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
                                    className="outlined"
                                    label="Bill Book"
                                    type={Text}
                                    name="billBookName"
                                    select
                                    value={data.billBookName}
                                    defaultValue='Choose'
                                    onChange={handleChange}
                                    {...(validate.partyName && { error: true, helperText: validate.partyName })}
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
                                    name="billNumber"
                                    value={data.billNumber}
                                    defaultValue='Choose'
                                    onChange={handleChange}
                                    {...(validate.partyName && { error: true, helperText: validate.partyName })}
                                >
                                    {billList.map((list) =>
                                        <MenuItem key={list} value={list}>{list}</MenuItem>
                                    )}
                                </TextField>

                                {/* PARTY NAME */}
                                <TextField
                                    required
                                    className="outlined"
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
                                            value={data} onChange={e => handleRowChange(e, i)}
                                            component="form"
                                            sx={{ '& .MuiTextField-root': { m: 2, width: '30ch' }, }}
                                            autoComplete="off">

                                            <TextField
                                                required
                                                className="outlined-required"
                                                label="Item name"
                                                type={Text}
                                                name="itemName"
                                                select
                                                value={data.itemName}
                                                onChange={handleChange}
                                                {...(validate.itemName && { error: true, helperText: validate.itemName })}>
                                                {itemList.map((list) =>
                                                    <MenuItem key={list} value={list}>{list}</MenuItem>)}
                                            </TextField>
                                            <TextField
                                                required
                                                className="outlined-required"
                                                label="Item Quantity"
                                                type={Text}
                                                name="itemQuantity"
                                                select
                                                value={data.itemName}
                                                onChange={handleChange}
                                                {...(validate.itemName && { error: true, helperText: validate.itemName })}>
                                                {itemList.map((list) =>
                                                    <MenuItem key={list} value={list}>{list}</MenuItem>)}
                                            </TextField>
                                            <TextField
                                                required
                                                className="outlined-required"
                                                label="Item Quantity Type"
                                                type={Text}
                                                name="itemQuantityType"
                                                select
                                                value={data.itemName}
                                                onChange={handleChange}
                                                {...(validate.itemName && { error: true, helperText: validate.itemName })}>
                                                {itemList.map((list) =>
                                                    <MenuItem key={list} value={list}>{list}</MenuItem>)}
                                            </TextField>
                                            <TextField
                                                required
                                                className="outlined-required"
                                                label="Initial Price Per Quantity"
                                                type={Text}
                                                name="initialPricePerQuantity"
                                                select
                                                value={data.itemName}
                                                onChange={handleChange}
                                                {...(validate.itemName && { error: true, helperText: validate.itemName })}>
                                                {itemList.map((list) =>
                                                    <MenuItem key={list} value={list}>{list}</MenuItem>)}
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
                    <div className='dense-table' style={{ height: 400, width: '80%' }}>
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

























