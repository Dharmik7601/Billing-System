import axios from "axios"

export async function checkAuth() {
    let check
    try {
            await axios.get("http://localhost:5000/api/v1/user/check-auth", {
                withCredentials:true
            }).then(response => {
                check = response.data.user
            })
        } catch (err) {
            check = false
    }
    return check
}

