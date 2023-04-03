import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function HomePage() {

    const Navigate = useNavigate()

    const checkHomePageAuth = async () => {
        try {
            await axios.get("http://localhost:5000/api/v1/user/check-auth", {
                withCredentials:true
            }).then(response => {
                console.log(response.data.user);
                if (response.data.user) {
                    Navigate('/user/home')
                    return
                } else {
                    Navigate('/login')
                }
            })
        } catch (err) {
            Navigate('/login')
        }
    }
    
    useEffect(() => {
        checkHomePageAuth()
    },[])

    return (
        <></>
    )
}

export default HomePage