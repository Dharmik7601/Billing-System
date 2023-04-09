const Party = require('../model/partyModel')
const { StatusCodes } = require('http-status-codes')
const { NotBeforeError } = require('jsonwebtoken')
const { NotFoundError } = require('../error')

const createParty = async (req, res) => {
    const party = await Party.create(req.body)
    res.status(StatusCodes.CREATED).json({ msg: 'Success', party })
}

const getAllParty = async (req, res) => {
    const parties = await Party.find({})
    let getParty = []
    let i = 1 
    const pro = parties.map((party) => {
        getParty.push({
            id:i,
            partyName: party.partyName,
            partyType: party.partyType,
            partyEmail: party.email,
            partyMobile: party.mobile,
            partyId: party._id,
        })
        i++;
    })
    await Promise.all(pro)
    res.status(StatusCodes.OK).json(getParty)
}

const getPartyProductList = async (req, res) => {
    const {partyId} = req.params
    const party = await Party.findOne({ _id: partyId }).populate("productLists")
    if (!party) throw new NotFoundError(`No party found with id: ${partyId}`)
    const productLists = party.productLists 
    let getParty = []
    let i = 1 
    const pro = productLists.map((party) => {
        getParty.push({
            id:i,
            productName: party.productName,
            templateName: party.productTemplateName,
        })
        i++;
    })
    await Promise.all(pro)
    res.status(StatusCodes.OK).json(getParty)
}

const getPartyProductNameList = async (req, res) => {
    console.log(req.body);
    const {partyName} = req.body
    const party = await Party.findOne({ partyName: partyName }).populate("productLists")
    if (!party) throw new NotFoundError(`No party found with id: ${partyName}`)
    const productLists = party.productLists 
    let getParty = []
    const pro = productLists.map((party) => {
        getParty.push(
            party.productName
        )
    })
    await Promise.all(pro)
    console.log(getParty);
    res.status(StatusCodes.OK).json(getParty)
}

const getSingleParty = async (req, res) => {
    const { partyId } = req.params
    const party = await Party.findOne({ _id: partyId })
    if (!party) throw new NotFoundError(`No party found with id: ${partyId}`)
    console.log(party);
    let getParty = {
            partyName: party.partyName,
            partyType: party.partyType,
            partyEmail: party.email,
            partyMobile: party.mobile,
            partyGstNo: party.gstNo,
            ifscCode: party.ifscCode,
            accountName: party.accountName,
            accountType: party.accountType,
            partyAddress: party.address,
            accountNumber: party.accountNumber,
        }
    res.status(StatusCodes.OK).json(getParty)
}

const getAllPartiesName = async (req, res) => {
    const parties = await Party.find({}, { _id: false }).select("partName")
    let nameList = []
    const par = parties.map((party) => {
        nameList.push(party.partyName)
    })
    await Promise.all(par)
    res.status(StatusCodes.OK).json(nameList)
}

const getPartyAddress = async (req, res) => {
    const {partyName} = req.params
    const party = await Party.findOne({ partyName: partyName })
    if(!party) throw new NotFoundError(`No party found with name: ${partyName}`)
    res.status(StatusCodes.OK).json({partyAddress:party.address})
}

const getProductsUnderParty = async (req, res) => {
    const { name } = req.body
    const party = await Party.findOne({ partyName: name }).select("productLists").populate("productLists")
    const productsList = []
    for (let i = 0; i < party.productLists.length; i++){
        productsList.push(party.productLists[i].productName)
    }
    res.status(StatusCodes.OK).json(productsList)
}

const checkIfProductExists = async (req, res) => {
    const { productName, partyName } = req.body;
    const party = await Party.findOne({ partyName: partyName }).populate("productLists").select("productLists")
    console.log(party)
    for (let i = 0; i < party.productLists.length; i++){
        if(productName === party.productLists[i].productName) return res.status(StatusCodes.OK).json({product:party.productLists[i]})
    }
    res.status(StatusCodes.OK).json({msg:"Not found"})
}


module.exports = {
    createParty, getAllParty, getProductsUnderParty, checkIfProductExists, getAllPartiesName, getSingleParty,getPartyProductList,getPartyProductNameList,getPartyAddress
}
