const PartyProduct = require('../model/partyProductModel')
const Party = require('../model/partyModel')
const Produc = require('../model/itemSchema')
// const ProductTemplate = require('../model/productTemplateModel')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../error')

const createPartyProduct = async(req, res) => {
    // const { productName, partyName, productTemplateName } = req.body.data;
    // console.log(productName,partyName,productTemplateName);
    // const productTemplate = await ProductTemplate.findOne({ templateName: productTemplateName,productName:productName })
    // if (!productTemplate) throw new NotFoundError(`No template found with name: ${productTemplateName} under product name: ${productName}`)
    // const partyProduct = await PartyProduct.create(req.body.data)
    // const party = await Party.findOneAndUpdate({ partyName: partyName }, {
    //     $push: {productLists: partyProduct._id}
    // }, { new: true, runValidators: true })
    // const product = await Product.findOneAndUpdate({ productName: productName },
    //     { $push: { soldBy: party._id } },
    //     { new: true, runValidators: true });
    // partyProduct.productId = product._id;
    // partyProduct.productTemplateId = productTemplate._id
    // await partyProduct.save()
    // res.status(StatusCodes.CREATED).json({msg:"Succes",partyProduct})
}

const getTemplateName = async (req,res) => {
    // const { partyName, productName } = req.body;
    // const pp = await PartyProduct.findOne({ partyName: partyName, productName: productName })
    // if(!pp) throw new NotFoundError(`No template found under product: ${productName} and party: ${partyName}`)
    // const template = await ProductTemplate.findOne({ _id: pp.productTemplateId.toString(), productName: pp.productName, templateName: pp.productTemplateName })
    // if (!template) throw new NotFoundError(`No template found`)
    // console.log(template);
    // const templateData = {
    //     templateName: template.templateName,
    //     productSize: template.productSize,
    //     productQuantity: template.productQuantity,
    //     quantityType: template.productQuantityType,
    //     productPrice: template.productPrice
    // }
    // res.status(StatusCodes.OK).json(templateData)
}

module.exports = {createPartyProduct,getTemplateName}