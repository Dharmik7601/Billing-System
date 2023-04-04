import { React, useState } from "react";
import Forms from "../../components/Forms/Forms";
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const Login = () => {

    const Navigate = useNavigate()

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const [error, setError] = useState({
        username: '',
        password: ''
    })

    const inputs = [
        {
            id: 1,
            label: 'Username',
            placeholder: 'Enter username',
            name: 'username',
            type: 'text',
            errorMessage: 'Username should be of 5-16 characters and should not include special characters',
            pattern: "^[A-Za-z0-9]{5,16}$",
            required: true
        },
        {
            id: 2,
            label: 'Password',
            placeholder: 'Enter password',
            name: 'password',
            type: 'password',
            errorMessage: 'Please enter your password',
        }
    ]


    const handleChange = (e) => {
        const { value, name } = e.target
        setUser({
            ...user,
            [name]: value
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
                Navigate('/login/enter-otp')
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
        <>
            <div className="login">
                <form>
                    <h1 className="title">Login</h1>
                    {inputs.map((input) => (
                        <Forms key={input.id} {...input} value={user[input.name]} handleChange={handleChange} autocomplete='off' error={error} required />
                    ))}
                    <button onClick={handleSubmit} className='submit'>Submit</button>
                    <div className="tosignup">
                        <p>New user?</p><a href='http://localhost:3000/register'>Signup</a>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login