const { NotFoundError } = require('../error')
const Shipping = require('../model/shippingModel')
const { StatusCodes } = require('http-status-codes')

const createShippingInfo = async (req, res) => {
    const shippingInfo = await Shipping.create(req.body)
    res.status(StatusCodes.CREATED).json({msg:'Shipping details added'})
}

const getAllShippingInfo = async (req, res) => {
    const shippings = await Shipping.find({})
    if(!shippings) throw new NotFoundError(`No shipping records found`)
    let getShippingInfo = []
    let i = 1 
    const pro = shippings.map((shipping) => {
        getShippingInfo.push({
            id: i,
            shippingId: shipping._id,
            shippingName: shipping.shippingName,
            shippingType: shipping.shippingType,
            email: shipping.email,
        })
        i++;
    })
    await Promise.all(pro)
    res.status(StatusCodes.OK).json(getShippingInfo)
}

const getSingleShippingInfo = async (req, res) => {
    const { shippingId } = req.params
    const shipping = await Shipping.findOne({ _id: shippingId })
    if (!shipping) throw new NotFoundError(`No party found with id: ${shippingId}`)
    let getShippingInfo = {
        shippingId: shipping._id,
        shippingDescription: shipping.shippingDescription,
            shippingName: shipping.shippingName,
            shippingType: shipping.shippingType,
            email: shipping.email,
            mobile: shipping.mobile,
            gstNumber: shipping.gstNumber,
            shippingOfficeAddress: shipping.shippingOfficeAddress,
            accountNumber: shipping.accountNumber,
        }
    res.status(StatusCodes.OK).json(getShippingInfo)
}

const getAllShippingName = async (req, res) => {
    const { shippingType } = req.params
    const shippings = await Shipping.find({ shippingType: shippingType })
    if(shippings.length === 0) throw new NotFoundError(`No bill book found with type: ${shippingType}`)
    let shippingNameList = []
    const bb = shippings.map((shipping) => {
            shippingNameList.push(
                shipping.shippingName
            )
        })
    await Promise.all(bb)
    res.status(StatusCodes.OK).json(shippingNameList)
}

module.exports = {createShippingInfo,getAllShippingInfo,getSingleShippingInfo,getAllShippingName}