import React, { useState } from 'react'
import Forms from '../../../components/Forms/Forms'
import "../otp.scss"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function LoginOtp() {

    const Navigate = useNavigate()

    const [data, setData] = useState({
        otp: ''
    })

    const [error, setError] = useState({
        otp: ''
    })

    const input = {
        id: 1,
        label: 'An OTP has been sent to your registered email',
        placeholder: 'Enter OTP',
        errorMessage: 'Please enter a valid OTP',
        name: 'otp',
        type: 'text',
        pattern: "^[0-9a-zA-Z]{1,}$"
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
        console.log(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (data.otp === '') {
            alert('Please enter OTP')
            return
        }
        try {
            await axios.post("http://localhost:5000/api/v1/user/login-otp", data, {
                withCredentials: true
            }).then(response => {
                console.log(response);
                Navigate('/user/home')
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
        <div className='otp'>
            <form>
                <h1 className="title">Verify Yourself</h1>
                <Forms key={input.id} {...input} handleChange={handleChange} error={error} />
                <button className='submit' onClick={handleSubmit}>Submit</button>
                <div className="resend">
                    <p>Did not receive OTP?</p><a href='http://localhost:3000'>Login</a>
                </div>
            </form>
        </div>
    )
}

export default LoginOtp