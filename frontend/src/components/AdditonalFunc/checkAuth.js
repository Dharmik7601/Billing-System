import axios from "axios"

export const checkAuth = async () => {
    try {
            await axios.get("http://localhost:5000/api/v1/user/check-auth", {
                withCredentials:true
            }).then(response => {
                if (response.data.user) {
                    return true
                } else {
                    return false
                }
            })
        } catch (err) {
            return false
        }
}

