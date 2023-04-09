const express = require('express')
const { createUser, getAllUser, checkIfUsernameAvailable, checkRegisterOtp, login, checkLoginOtp, checkAuth } = require('../controller/userCtrl')
const { authMiddleware, isUser } = require('../middleware/AuthMiddleware')
const router = express.Router()

router.get('/check-auth',authMiddleware,isUser,checkAuth)
router.post('/register', createUser)
router.post('/register-otp', checkRegisterOtp)
router.post('/login', login)
router.post('/login-otp', checkLoginOtp)
router.get('/getAll', getAllUser)
router.post('/ciua',checkIfUsernameAvailable)

module.exports = router