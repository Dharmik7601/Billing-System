const express = require('express')
const { createBillBook, getAllBillBooks, bills, getAllBillBooksName, getBillInfo } = require('../controller/billBookController')

const router = express.Router()

router.post('/create', createBillBook)
router.get('/getALL', getAllBillBooks) 
router.get('/name/getALL', getAllBillBooksName) 
router.post('/type/bills', getBillInfo) 
router.post('/test',bills)

module.exports = router