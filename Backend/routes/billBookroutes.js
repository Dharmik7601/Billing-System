const express = require('express')
const { createBillBook, getAllBillBooks, bills, getAllBillBooksName, getBillInfo, getNextBill } = require('../controller/billBookController')

const router = express.Router()

router.post('/create', createBillBook)
router.get('/getALL', getAllBillBooks) 
router.get('/name/getAll', getAllBillBooksName) 
router.post('/type/bills', getBillInfo) 
router.post('/test', getNextBill)
router.post('/test1',bills)

module.exports = router