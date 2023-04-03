import React,{useState} from 'react'
import { DataTable } from '../../components/DataTables/DataTable';
import Forms from '../../components/Forms/Forms';
import axios from 'axios';
import Testk from '../../components/test/Testk';

var inputCount = 1;


function Testing() {
    const[count,setCount] = useState()
    const container = document.getElementById('input-cont');
        var maxInputAllowed = 5;
        
        // Call addInput() function on button click
    function addInput() {
        console.log("je");
        inputCount++; // Increment input count by one
        if (inputCount > 5) {
                alert('You can add maximum 5 input fields.');
                return;
            }
            // let input = import
            // const input = <DataGrid />
        setCount(inputCount)
        console.log(count);
    }
    
    const displayItems = () => {
        for (let i = 0; i < count; i++){
            return <Testk />
        }
    }

    const [user, setUser] = useState({
        username: '',
        password:''
    })

    const [error, setError] = useState({
        username: '',
        password:''
    })

    const input = [
        {
            id: 1,
            label: 'Username',
            placeholder: 'Enter username',
            name: 'username',
            type: 'text',
            errorMessage: 'Username should be of 5-16 characters and should not include special characters',
            pattern: "^[A-Za-z0-9]{5,16}$",
            required:true
        }
    ]

    
    const handleChange = (e) => {
        const { value, name } = e.target
        setUser({
            ...user,
            [name]:value
        })
        console.log(user)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if ((user.username || user.password) === '') {
            alert('Please fill out the requried details')
            return
        }
        try {
            await axios.post("http://localhost:5000/api/v1/user/login", user, {
                withCredentials: true
            }).then(response => {
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
            } else {
                alert("Something went wrong")
            }
        }
    }


    return (

<body>
    <h2>Add input on button click:</h2>
            <div id='input-cont'>
                {displayItems}
    </div>
    <button onClick={addInput}>+Add input</button>

</body>
)
}

export default Testing