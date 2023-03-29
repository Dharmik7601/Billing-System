import React,{useState,useEffect} from 'react'
import Sidebar from "../../../../components/SideBar/Sidebar"
import NavBar from "../../../../components/NavBar/NavBar"
import "./RegisterProduct.scss"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios"

function RegisterProduct() {

    const [partyList, setPartyList] = useState([])
    const [productList, setProductList] = useState([])
    const [templateList,setTemplateList] = useState([])

    useEffect(() => {
        partyNameList()
    },[])

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

    const getProductNameList = async (name) => {
        try {
            await axios.post(`${process.env.REACT_APP_LINK}/product/patl`, {
                partyName: name
            }, {
                withCredentials: true
            }).then(response => {
                setProductList(response.data)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }

    const getTemplateList = async (name) => {
        try {
            await axios.post(`${process.env.REACT_APP_LINK}/product/template/name/getAll`, {
                productName: name
            }, {
                withCredentials: true
            }).then(response => {
                setTemplateList(response.data)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            }
            alert('Something went wrong')
        }
    }

    const [data, setData] = useState({
        partyName: '',
        productName: '',
        productTemplateName: ''
    })

    const [validate,setValidate] = useState({})

    const handleChange = async (e) => {
        const targetName = e.target.name
        console.log(e.target.value);
        if (targetName === 'partyName') {
            await getProductNameList(e.target.value)
        }
        if (targetName === 'productName') {
            await getTemplateList(e.target.value)
        }
        setData({
            ...data,
            [targetName]:e.target.value
        })
        console.log(data);
    }

    const handleSubmit = async (e) => {
        const verror = {
        partyName: '',
        productName: '',
        productTemplateName: '',
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
            await axios.post(`${process.env.REACT_APP_LINK}/party-product/create`, {
                data
            },{
                withCredentials:true
            }).then(response => {
                console.log(response.data)
            })
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='registerProduct'>
            <Sidebar />
            <div className="rpContainer">
                <NavBar />
                <div className="inputContainer">
                    <div className="title">
                            <h1>REGISTER PRODUCT</h1>
                    </div>
                    
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 2, width: '30ch' }, }}
                        autoComplete="off">
                        <div className='row1'>
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
                            <TextField
                                required
                                id="outlined-required"
                                label="Product name"
                                type={Text}
                                name="productName"
                                select
                                value={data.productName}  
                                onChange={handleChange}
                                    {...(validate.productName && { error: true, helperText: validate.productName })}      
                            >
                                {productList.map((list) =>
                                        <MenuItem key={list} value={list}>{list}</MenuItem>
                                    )}
                            </TextField>
                            <TextField
                                required
                                id="outlined-required"
                                label="Template name"
                                type={Text}
                                name="productTemplateName"
                                select
                                value={data.templateName}  
                                onChange={handleChange}
                                    {...(validate.templateName && { error: true, helperText: validate.templateName })}      
                            >
                                {templateList.map((list) =>
                                        <MenuItem key={list} value={list}>{list}</MenuItem>
                                    )}
                            </TextField>
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
    )
}

export default RegisterProduct