const ProductTemplate = require('../model/productTemplateModel')
const Product = require('../model/itemSchema')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../error')
const Party = require('../model/partyModel')

const createProductTemplate = async (req, res) => {
    console.log(req.body);
    const { partyName } = req.body;
    const party = await Party.findOne({ partyName: partyName })
    if(!party) throw new NotFoundError(`No party found with name: ${partyName}`)
    const pTemplate = await ProductTemplate.create(req.body);
    await Party.findOneAndUpdate({ _id: party._id.toString() }, {
        $push: {
            templateUsed:pTemplate._id
        }
    })
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