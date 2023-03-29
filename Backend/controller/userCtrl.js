const User = require('../model/userModel')
const { StatusCodes } = require('http-status-codes')
const { generateOtp, generateOtpToken,generateJWTToken } = require('../middleware/AdditionalFunc')
const { NotFoundError,UnauthenticatedError } = require('../error')
const sendMail = require('./emailController')

const checkAuth = async (req, res) => {
    res.status(StatusCodes.OK).json({user:true})
}

const createUser = async (req, res) => {
    const user = await User.create(req.body)
    // const otp = await generateOtp()
    user.otp = '111111'
    user.otpToken = generateOtpToken()
    user.otpTokenExp = new Date(Date.now() + 1000 * 60 * 3) //3minutes
    await user.save()
    res.cookie('Token', user.otpToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000*60*3)
    })
    res.status(StatusCodes.CREATED).json({ msg: "OTP sent" })
}

const checkRegisterOtp = async (req, res) => {
    const  Token  =  req.cookies.Token
    const { otp } = req.body
    const user = await User.findOne({ otp: otp, otpToken: Token, otpTokenExp: { $gt: Date.now() } })
    if (!user) throw new NotFoundError('Invalid OTP')
    user.otp = undefined
    user.otpToken = undefined
    user.otpTokenExp = undefined
    await user.save()
    res.clearCookie("Token", {
        httpOnly: true,
        secure: true
    })
    res.status(StatusCodes.OK).json({msg:"success"})
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username })
    if (!user) throw new NotFoundError('No user found')
    const isPassCorrect = await user.checkPassword(password)
    if (!isPassCorrect) throw new UnauthenticatedError('Invalid Credentials')
    user.otp = '111111'
    user.otpToken = generateOtpToken()
    user.otpTokenExp = new Date(Date.now() + 1000 * 60 * 3)
    await user.save()
    res.cookie('Token', user.otpToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000*60*3)
    })
    res.status(StatusCodes.OK).json({otp:"sent"})
}

const checkLoginOtp = async (req, res) => {
    const  Token  =  req.cookies.Token
    const { otp } = req.body
    const user = await User.findOne({ otp: otp, otpToken: Token, otpTokenExp: { $gt: Date.now() } })
    if (!user) throw new NotFoundError('Invalid OTP')
    user.otp = undefined
    user.otpToken = undefined
    user.otpTokenExp = undefined
    await user.save()
    res.clearCookie("Token", {
        httpOnly: true,
        secure: true
    })
    const payload = {
        username: user.username,
        email: user.email
    }
    const userToken = generateJWTToken(payload)
    res.cookie("UToken", userToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000*60*60*24)
    })
    res.status(StatusCodes.OK).json({msg:"success"})
}

const getAllUser = async (req, res) => {
    const user = await User.find({})
    res.status(StatusCodes.OK).json(user)
}

const checkIfUsernameAvailable = async (req, res) => {
    console.log(req.body)
    const { username }  = req.body
    const user = await User.findOne({ username: username })
    if (!user) {
        return res.status(StatusCodes.OK).json({available:true})
    }
    res.status(StatusCodes.OK).json({available:false})
}

module.exports = { createUser, getAllUser, checkIfUsernameAvailable, checkRegisterOtp,login,checkLoginOtp,checkAuth}