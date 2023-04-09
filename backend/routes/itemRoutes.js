const express = require('express')
const router = express.Router()

const { createItem, getAllItems, productsAvailableToList, getAllProductsName, getAllProductsTemplatesName, getAllProductsTemplates, getAllProductsSoldBy, getSingleItem, getAllItemsName, getItemDetails } = require("../controller/itemController")
const { createProductTemplate } = require('../controller/productTemplateCtrl')

router.post('/create', createItem)
router.get('/getAll', getAllItems)
router.get('/get/details/:itemName',getItemDetails)
router.post('/patl', productsAvailableToList)
router.post('/add/template', createProductTemplate)
router.get('/name/getAll', getAllItemsName)
router.post('/template/name/getAll', getAllProductsTemplatesName)
router.get('/single/:itemId', getSingleItem)
router.get('/template/getAll/:itemId', getAllProductsTemplates)
router.get('/soldBy/getAll/:productId',getAllProductsSoldBy)

module.exports = router