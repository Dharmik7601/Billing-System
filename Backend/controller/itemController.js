const Item = require('../model/itemSchema')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../error')

const createItem = async (req, res) => {
    console.log(req.body)
    const item = await Item.create(req.body)
    res.status(StatusCodes.CREATED).json({msg:'Item Added'})
}

const getAllItems = async (req, res) => {
    const items = await Item.find({})
    let getItems = []
    let i = 1 
    const pro = items.map((item) => {
        getItems.push({
            id:i,
            itemId: item._id,
            itemName: item.itemName,
            itemDescription: item.itemDescription,
            noOfTemplates: item.itemTemplates.length
        })
        i++;
    })
    await Promise.all(pro)
    res.status(StatusCodes.OK).json(getItems)
}

const getAllItemsName = async (req, res) => {
    const items = await Item.find({}).select("itemName")
    if(!items) throw new NotFoundError(`No items found`)
    let itemList = []
    const pro = items.map((item) => {
        itemList.push(item.itemName)
    })
    await Promise.all(pro)
    res.status(StatusCodes.OK).json(itemList)
}

const getAllProductsTemplatesName = async (req, res) => {
    const { productName } = req.body;
    console.log(productName);
    const products = await Product.findOne({ productName: productName }).populate("productTemplates").select("productTemplates")
    if (!products) throw new NotFoundError(`No product found with product name : ${productName}`)
    const tempList = products.productTemplates
    let productList = []
    const pro = tempList.map((temp) => {
        productList.push(temp.templateName)
    })
    await Promise.all(pro)
    res.status(StatusCodes.OK).json(productList)
}

const getAllProductsTemplates = async (req, res) => {
    const { productId } = req.params;
    const products = await Product.findOne({ _id: productId }).populate("productTemplates").select("productTemplates")
    if (!products) throw new NotFoundError(`No product found with product id : ${productId}`)
    const tempList = products.productTemplates
    let productList = []
    const pro = tempList.map((temp) => {
        productList.push({
            templateName: temp.templateName
        })
    })
    await Promise.all(pro)
    res.status(StatusCodes.OK).json(productList)
}

const getAllProductsSoldBy = async (req, res) => {
    const { itemId } = req.params;
    const items = await Item.findOne({ _id: itemId }).populate("soldBy").select("soldBy")
    if (!items) throw new NotFoundError(`No product found with product id : ${productId}`)
    console.log(items);
    const supplierList = items.soldBy
    let itemList = []
    const pro = supplierList.map((list) => {
        itemList.push({
            supplierName: itemId.partyName
        })
    })
    await Promise.all(pro)
    res.status(StatusCodes.OK).json(productList)
}

const productsAvailableToList = async (req, res) => {
    const { partyName } = req.body
    const products = await Product.find({}).populate("soldBy")
    let productList = []
    for (let i = 0; i < products.length; i++) {
        let isPresent = false
        for (let j = 0; j < products[i].soldBy.length; j++) {
            if (products[i].soldBy[j].partyName === partyName) {
                isPresent = true
                break
            }
        }
        if (!isPresent) {
            productList.push(products[i].productName)
        }
    }
    res.status(StatusCodes.OK).json(productList)
}

const getSingleItem = async (req, res) => {
    const { itemId } = req.params
    const item = await Item.findOne({ _id: itemId })
    if(!item) throw new NotFoundError(`No item found`)
    let getItemInfo = {
        itemId: item._id,
        itemName: item.itemName,
        itemDescription: item.itemDescription
    }
    res.status(StatusCodes.OK).json(getItemInfo)
}
module.exports = {createItem,getAllItems,productsAvailableToList,getAllItemsName,getSingleItem,getAllProductsTemplatesName,getAllProductsTemplates,getAllProductsSoldBy}