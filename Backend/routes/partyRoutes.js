const express = require('express')
const { createParty, getAllParty, getProductsUnderParty, checkIfProductExists, getAllPartiesName, getSingleParty, getAllPar, getPartyProductList, getPartyProductNameList } = require('../controller/partyCtrl')
const router = express.Router()
const {authMiddleware,isUser} = require('../middleware/AuthMiddleware')

router.post('/create',authMiddleware,isUser, createParty)
router.get('/getAll', getAllParty)
router.get('/party-product/all/:partyId', getPartyProductList)
router.get('/pup', getProductsUnderParty)
router.get('/cipe', checkIfProductExists)
router.get('/getAll/Name', getAllPartiesName)
router.get('/single/:partyId', getSingleParty)
router.post('/products/name',getPartyProductNameList)

module.exports = router