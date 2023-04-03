import React, { useState } from "react";
import "./Register.css"
import Forms from '../../components/Forms/Forms'
import { useNavigate } from 'react-router-dom';
import axios from "axios"



// USERNAME VALIDATION//
function validateName(value) {
    let error = ''
    let status = true
    for (let letter of value) {
        if (!isNaN(letter)) {
            error = "Note: Letter expected"
            status = false
            break
        }
    }
    return {
        status,
        value: value.toLocaleUpperCase(),
        error
    }
}

// function validateUserName(value) {
//     let error = ''
//     let status = true
//     try {
//         axios.post("http://localhost:5000/api/v1/user/ciua", { username: value }).then(response => {
//             console.log(response.data.available)
//             if (!response.data.available) {
//                 console.log('geree');
//                 error = 'Username already taken. Please choose another username'
//                 console.log("error" + error);
//             }
//         })
//     } catch (err) {
//         console.log(err)
//     }
//     console.log(error);
//     return {
//         status,
//         value,
//         error
//     }
// }

//MOBILE NUMBER VALIDATION//
function validateMobile(value) {
    let error = ''
    let status = true
    if (value.length < 10) {
        error= 'Note: Mobile number should be of exact 10 digits'
    }
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

//EMAIL VALIDATION//
function validateEmail(value) {
    let error = ''
    let status = true
    if (!value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        // status = false
        error = 'Note: Please enter a valid email'
    }
    return {
        status,
        value,
        error
    }
}


const fieldValidations = {
    first_name: validateName,
    last_name: validateName,
    mobile: validateMobile,
    email:validateEmail
}

const Register = () => {

    const Navigate = useNavigate()

    const [user, setUser] = useState({
        username: '',
        first_name: '',
        last_name: '',
        mobile: '',
        email: '',
        password: '',
        repassword:''
    })

    

    const [error, setError] = useState({
        username:'',
        first_name: '',
        last_name: '',
        mobile: '',
        email: '',
    });


    const inputs = [
        {
            id: 1,
            label: 'Username',
            placeholder: 'Enter username',
            name: 'username',
            type: 'text',
            errorMessage: 'Username should be of 5-16 characters and should not include special characters',
            pattern: "^[A-Za-z0-9]{5,16}$",
            required:true
        },
        {
            id: 2,
            label: 'First Name',
            placeholder: 'Enter your first name',
            name: 'first_name',
            type: 'text',
            errorMessage: 'Please enter your first name',
            pattern:"^[A-Za-z]{1,100}$"
        },
        {
            id: 3,
            label: 'Last Name',
            placeholder: 'Enter yout last name',
            name: 'last_name',
            type: 'text',
            errorMessage: 'Please enter your last name',
            pattern:"^[A-Za-z]{1,100}$"
        },
        {
            id: 4,
            label: 'Mobile number',
            placeholder: 'Enter your mobile number',
            name: 'mobile',
            type: 'mobile',
            errorMessage:'Please enter a valid mobile number',
            pattern:"^[0-9]{10,}$"
        },
        {
            id: 5,
            label: 'Email',
            placeholder: 'Enter email',
            name: 'email',
            type: 'email',
            errorMessage: 'Please enter email address'
        },
        {
            id: 6,
            label: 'Password',
            placeholder: 'Enter a strong password',
            name: 'password',
            type: 'password',
            errorMessage: 'Please enter a strong password',
            // pattern:"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        },
        {
            id: 7,
            label: 'Re-enter Password',
            placeholder: 'Confirm your password',
            name: 'repassword',
            type: 'password',
            errorMessage: 'Password does not match',
            pattern: user.password
        }
    ]
    
    
    
    const handleChange = async (e) => {
        const targetName = e.target.name
        console.log(e.target.value);
        let valid = { status: true, value: e.target.value }
        const validateFn = fieldValidations[targetName]
        if (targetName === 'username') {
            let error =''
            await axios.post("http://localhost:5000/api/v1/user/ciua", { username: e.target.value }).then(response => {
            console.log(response.data.available)
            if (!response.data.available) {
                console.log("here");
                error = "Username already taken. Please choose another one"
            }
                setError({
                    ...error, 
                    username:error
            })
        })
        }
        if (typeof validateFn === "function") {
            valid = validateFn(valid.value) // boolean value
        }
        if (!valid.status) {
            setError({
                ...error,
                [targetName]:valid.error
            })
            return
        } else if ((targetName === 'mobile'||targetName === 'email') && valid.status && valid.error) {
            console.log(targetName)
            setError({
                ...error,
                [targetName]:valid.error
            })
        }
        else if((targetName !== 'username')) {
            setError({
                ...error,
                [targetName]:''
            })
        }
        let x = { ...user };
        x[targetName] = valid.value;
        setUser(x);
    }

    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        let isFormEmpty = false;
        for (let x in user) {
            if (user[x] === '') {
                isFormEmpty = true;
                break
            }
        }
        if (isFormEmpty) {
            alert('Please fill out the remaining details')
            return
        }
        if (error.email || error.mobile || error.username) {
            alert('Please fill out correct details')
            return
        }
        try {
            await axios.post('http://localhost:5000/api/v1/user/register', user, {
                withCredentials: true
            }).then(response => {
                console.log(response)
                Navigate('/register/enter-otp')
            })
        } catch (err) {
            console.log(err);
            return
        }
    }

    return (
        <div className="register">
            <form>
                <h1>Register</h1>
                {inputs.map((input) => (
                    <Forms key={input.id} {...input} value={user[input.name]} handleChange={handleChange} autocomplete='off' required error={error} />
                ))}
                <button onClick={handleSubmit}>Submit</button>
                <div className="tologin">
                    <p>Already a user?</p><a href='http://localhost:3000'>Login</a>
                </div>
            </form>
        </div>
    );
}

export default Register