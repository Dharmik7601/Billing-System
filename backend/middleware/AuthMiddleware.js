const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const User = require('../model/userModel')
const { UnauthorizedError, NotFoundError } = require('../error')

const authMiddleware = async (req, res,next) => {
    const { UToken } = req.cookies;
    if (!UToken) throw new NotFoundError('User token not found')
    try {
        const decodedToken = await jwt.verify(UToken, process.env.JWT_SECRET, {
            algorithms: 'HS256'
        })
        req.user = {
            username: decodedToken.username,
            email: decodedToken.email
        }
        next()
    } catch (err) {
        console.log(err);
    };
}

const isUser = async (req, res,next) => {
    const { username, email } = req.user;
    if (!username || !email) {
        res.clearCookie("UToken", {
            secure: true,
            httpOnly:true
        })
        throw new UnauthorizedError('Not authorized')
    }
    const user = await User.findOne({ email: email, username: username })
    if (!user) {
        res.clearCookie("UToken", {
            secure: true,
            httpOnly:true
        })
        req.user = {}
        throw new NotFoundError('Not authorized')
    } else {
        next()
    }
}


module.exports = {authMiddleware,isUser}