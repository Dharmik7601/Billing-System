const express = require('express')
const { createBillBook, getAllBillBooks, bills, getAllBillBooksName, getBillInfo, getNextBill, getBillBookDetails } = require('../controller/billBookController')

const router = express.Router()

router.post('/create', createBillBook)
router.get('/getALL', getAllBillBooks) 
router.get('/name/getAll/:billBookType', getAllBillBooksName) 
router.post('/type/bills', getBillInfo) 
router.get('/get/next-bill/:billBookName', getNextBill)
router.post('/test1', bills)
router.get('/get/bills/:billBookName',getBillBookDetails)

module.exports = router