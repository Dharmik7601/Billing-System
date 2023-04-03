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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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


    return (
        <div className='generateInvoice'>
            <Sidebar />
            <div className="generateInvoiceContainer">
                <NavBar />
                <div className="inputContainer">
                    <div className="invoiceContent">
                        <div className="title">
                            <h1>GENERATE INVOICE</h1>
                        </div>
                        <Box
                            component="form"
                            sx={{ '& .MuiTextField-root': { m: 2, width: '30ch' }, }}
                            autoComplete="off">
                            <div className="row1">
                                <TextField
                                    id="outlined"
                                    label="Bill Book Type"
                                    type={Text}
                                    name="billBookType"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={type}
                                >
                                </TextField>
                                <TextField
                                    required
                                    id="outlined-required"
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
                            </div>
                            <div className='row2'>

                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Bill Number"
                                    type={Text}
                                    name="billNumber"
                                    select
                                    value={data.billNumber}
                                    defaultValue='Choose'
                                    onChange={handleChange}
                                    {...(validate.partyName && { error: true, helperText: validate.partyName })}
                                >
                                    {billList.map((list) =>
                                        <MenuItem key={list} value={list}>{list}</MenuItem>
                                    )}
                                </TextField>
                                <TextField
                                    required
                                    id="outlined-required"
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
                            {/* <div className="row3">
                           
                            <TextField
                                required
                                id="outlined-required"
                                label="Item name"
                                type={Text}
                                name="itemName"
                                select
                                value={data.itemName}  
                                onChange={handleChange}
                                    {...(validate.itemName && { error: true, helperText: validate.itemName })}      
                            >
                                {itemList.map((list) =>
                                        <MenuItem key={list} value={list}>{list}</MenuItem>
                                    )}
                            </TextField>
                            <TextField
                                required
                                id="outlined"
                                label="Template name"
                                type={Text}
                                name="itemTemplateName"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={templateData.templateName}  
                                    {...(validate.templateName && { error: true, helperText: validate.templateName })}      
                            >
                            </TextField>
                        </div>
                        <div className="row4">
                             
                                <TextField
                                    size="small"
                                required
                                id="outlined"
                                label="Item Quantity"
                                type={Text}
                                name="itemTemplateName"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={templateData.itemQuantity}  
                                    {...(validate.templateName && { error: true, helperText: validate.templateName })}      
                            >
                            </TextField>
                            <TextField
                                required
                                id="outlined"
                                label="Qunatiy Type"
                                type={Text}
                                name="itemTemplateName"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={templateData.quantityType}  
                                    {...(validate.templateName && { error: true, helperText: validate.templateName })}      
                            >
                            </TextField>
                            </div>
                            <div className="row5">
                            
                            <TextField
                                required
                                id="outlined"
                                label="Price Per Quantity"
                                type={Text}
                                name="itemTemplateName"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={templateData.itemPrice}  
                                    {...(validate.templateName && { error: true, helperText: validate.templateName })}      
                            >
                            </TextField>
                            <TextField
                                required
                                id="outlined"
                                label="Item Size"
                                type={Text}
                                name="itemTemplateName"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={templateData.itemSize}  
                                    {...(validate.templateName && { error: true, helperText: validate.templateName })}      
                            >
                            </TextField>
                            </div> */}
                        </Box>
                        <div className="submit">
                            <div className="btn">
                                <Button size='large' variant='contained' onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>


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
                                                id="outlined-required"
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
                                                id="outlined"
                                                label="Template name"
                                                type={Text}
                                                name="itemTemplateName"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                value={templateData.templateName}
                                                {...(validate.templateName && { error: true, helperText: validate.templateName })}>
                                            </TextField>

                                        </Box>
                                    </div>

                                    {/* BUTTONS */}
                                    <div className="buttons">
                                        <div
                                            onClick={() => handleAdd()}
                                            className="addButton">
                                            <AddCircleOutlineIcon />
                                        </div>
                                        <div
                                            onClick={() => handleDelete(i)}
                                            //disabled={disableRemove}
                                            className="removeButton">
                                            <DeleteOutlineIcon />
                                        </div>
                                    </div>

                                </div>
                            </>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default GenerateInvoice

























