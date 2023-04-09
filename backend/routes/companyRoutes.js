const express = require('express')
const { createCompanyDetails } = require('../controller/companyController')

const router = express.Router()

router.post('/create', createCompanyDetails)


module.exports = router