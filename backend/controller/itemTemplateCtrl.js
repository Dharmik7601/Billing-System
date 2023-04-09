const ItemTemplate = require('../model/itemTemplatesModel')
const Product = require('../model/itemSchema')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../error')
const Party = require('../model/partyModel')

const createItemTemplate = async (req, res) => {
    const { partyName } = req.body;
    const party = await Party.findOne({ partyName: partyName })
    if(!party) throw new NotFoundError(`No party found with name: ${partyName}`)
    const pTemplate = await ItemTemplate.create(req.body);
    await Party.findOneAndUpdate({ _id: party._id.toString() }, {
        $push: {
            templateUsed:pTemplate._id
        }
    })
    res.status(StatusCodes.OK).json({msg:"Product template added",pTemplate})
}

module.exports = {createItemTemplate}