const ProductTemplate = require('../model/productTemplateModel')
const Product = require('../model/productModel')
const { StatusCodes } = require('http-status-codes')
const {NotFoundError} = require('../error')

const createProductTemplate = async (req, res) => {
    // const {productName } = req.body;
    const pTemplate = await ProductTemplate.create(req.body);
    // const product = await Product.findOneAndUpdate({ productName: productName }, {
    //     $push: { productTemplates: pTemplate._id }
    // },{
    //         new: true,
    //         runValidators: true
    // })
    // if (!product) throw new NotFoundError(`No product found with name : ${productName}`)
    res.status(StatusCodes.OK).json({msg:"Product template added",pTemplate})
}

module.exports = {createProductTemplate}