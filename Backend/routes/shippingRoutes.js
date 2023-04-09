const app = require('express')
const { createShippingInfo, getAllShippingInfo, getSingleShippingInfo, getAllShippingName } = require('../controller/shippingController')
const router = app.Router()

router.post('/create', createShippingInfo)
router.get('/get/All', getAllShippingInfo)
router.get('/get/single/info/:shippingId', getSingleShippingInfo)
router.get('/get/All/names/:shippingType',getAllShippingName)

module.exports = router