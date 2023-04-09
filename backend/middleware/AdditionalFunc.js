const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const generateOtp = () => {
    const str = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let otp = ''
    for (let i=0; i<6; i++){
        otp += str[Math.floor(Math.random()*(str.length))]
    }
    return otp
}

const generateOtpToken = () => {
    const Token = crypto.randomBytes(32).toString("hex")
    const otpToken = crypto.createHash("sha256").update(Token).digest("hex")
    return otpToken
}

const generateJWTToken = (payload) => {
    console.log(payload);
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: 'HS256'
    }, { expiresIn: process.env.JWT_LIFETIME })
    console.log(token);
    return token
}
module.exports = {generateOtp,generateOtpToken,generateJWTToken}