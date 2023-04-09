const User = require('../model/userModel')
const { StatusCodes } = require('http-status-codes')
const { generateOtp, generateOtpToken,generateJWTToken } = require('../middleware/AdditionalFunc')
const { NotFoundError,UnauthenticatedError } = require('../error')
const sendMail = require('./emailController')
const Company = require('../model/companyModel')

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

const getUserInfo = async (req, res) => {
    const {username,email} = req.user
    const user = await User.findOne({ username: username, email: email })
    if (!user) throw new NotFoundError(`No user found`)
    const company = await Company.findOne({})
    if (!company) throw new NotFoundError(`No company found`)
    res.status(StatusCodes.OK).json({
        userId: user._id,
        username: user.username,
        fullName: user.first_name + " " + user.last_name,
        userEmail: user.email,
        userMobile: user.mobile,
        companyName: company.companyName,
        companyAddress: company.companyAddress,
        companyGstNumber: company.gstNumber,
        companyAccountNumber: company.accountNumber,
        companyIfscCode: company.ifscCode,
        companyEmail: company.companyEmail
    })
}

const checkIfUsernameAvailable = async (req, res) => {
    const { username }  = req.body
    const user = await User.findOne({ username: username })
    if (!user) {
        return res.status(StatusCodes.OK).json({available:true})
    }
    res.status(StatusCodes.OK).json({available:false})
}

const logout = async (req, res) => {
    const cookie = req.cookies;
    if (!cookie) throw new NotFoundError('Cookie not found');
    res.clearCookie("UToken", {
            httpOnly: true,
            secure: true
    });
    return res.sendStatus(StatusCodes.FORBIDDEN)
}

module.exports = { createUser, getAllUser, checkIfUsernameAvailable, checkRegisterOtp,login,checkLoginOtp,checkAuth,getUserInfo,logout}