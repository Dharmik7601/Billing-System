const Product = require('../model/productModel')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../error')

const createProduct = async (req, res) => {
    console.log(req.body)
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({msg:'Success',product})
}

const getAllProducts = async (req, res) => {
    const products = await Product.find({})
    let getProducts = []
    let i = 1 
    const pro = products.map((product) => {
        getProducts.push({
            id:i,
            productId: product._id,
            productName: product.productName,
            productDescription: product.productDescription,
            noOfTemplates: product.productTemplates.length
        })
        i++;
    })
    await Promise.all(pro)
    res.status(StatusCodes.OK).json(getProducts)
}

const getAllProductsName = async (req, res) => {
    const products = await Product.find({}).select("productName")
    let productList = []
    const pro = products.map((product) => {
        productList.push(product.productName)
    })
    await Promise.all(pro)
    res.status(StatusCodes.OK).json(productList)
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
    const { productId } = req.params;
    const products = await Product.findOne({ _id: productId }).populate("soldBy").select("soldBy")
    if (!products) throw new NotFoundError(`No product found with product id : ${productId}`)
    console.log(products);
    const supplierList = products.soldBy
    let productList = []
    const pro = supplierList.map((list) => {
        productList.push({
            supplierName: list.partyName
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

const getSingleProduct = async (req, res) => {
    const {productId} = req.params
    const product = await Product.findOne({_id:productId})
    let getProducts = {
        productId: product._id,
        productName: product.productName,
        productDescription: product.productDescription
    }
    res.status(StatusCodes.OK).json(getProducts)
}
module.exports = {createProduct,getAllProducts,productsAvailableToList,getAllProductsName,getSingleProduct,getAllProductsTemplatesName,getAllProductsTemplates,getAllProductsSoldBy}