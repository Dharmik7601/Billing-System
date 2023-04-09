const express = require('express')
const { createInvoice, getInvoiceInfo } = require('../controller/invoiceController')

const router = express.Router()

router.post('/create', createInvoice)
router.get('/get/info/:invoiceId',getInvoiceInfo)

module.exports = router