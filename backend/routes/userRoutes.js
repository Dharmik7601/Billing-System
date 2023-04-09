const express = require('express')
const { createUser, getAllUser, checkIfUsernameAvailable, checkRegisterOtp, login, checkLoginOtp, checkAuth, getUserInfo, logout } = require('../controller/userCtrl')
const { authMiddleware, isUser } = require('../middleware/AuthMiddleware')
const router = express.Router()

router.get('/check-auth',authMiddleware,isUser,checkAuth)
router.post('/register', createUser)
router.post('/register-otp', checkRegisterOtp)
router.post('/login', login)
router.post('/login-otp', checkLoginOtp)
router.get('/getAll', getAllUser)
router.post('/ciua', checkIfUsernameAvailable)
router.get('/get/info', authMiddleware, isUser, getUserInfo)
router.get('/logout',logout)

module.exports = router