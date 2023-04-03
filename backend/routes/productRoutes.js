const express = require('express')
const router = express.Router()

const { createProduct, getAllProducts, productsAvailableToList, getAllProductsName, getSingleProduct, getAllProductsTemplatesName, getAllProductsTemplates, getAllProductsSoldBy } = require("../controller/productCtrl")
const { createProductTemplate } = require('../controller/productTemplateCtrl')

router.post('/create', createProduct)
router.get('/getAll', getAllProducts)
router.post('/patl', productsAvailableToList)
router.post('/add/template', createProductTemplate)
router.get('/name/getAll', getAllProductsName)
router.post('/template/name/getAll', getAllProductsTemplatesName)
router.get('/single/:productId', getSingleProduct)
router.get('/template/getAll/:productId', getAllProductsTemplates)
router.get('/soldBy/getAll/:productId',getAllProductsSoldBy)

module.exports = router