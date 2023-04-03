const express = require('express')
const { createPartyProduct, getTemplateName } = require('../controller/partyProductCtrl')
const router = express.Router()

router.post('/create', createPartyProduct)
router.post('/template/name',getTemplateName)

module.exports = router