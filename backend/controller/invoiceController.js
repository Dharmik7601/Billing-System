const Invoice = require('../model/invoiceModel')
const { StatusCodes } = require('http-status-codes')
const BillBook = require('../model/billBookModel')
const Party = require('../model/partyModel')
const {NotFoundError} = require('../error')

const createInvoice = async (req, res) => {
    const { billBookName, billBookType, billBookFinancialYear ,billBookNumber} = req.body
    const billBook = await BillBook.findOne({ billBookName: billBookName, financialYear: billBookFinancialYear, billBookType: billBookType })
    if (!billBook) throw new NotFoundError(`No bill book found with name: ${billBookName}`)
    const invoice = await Invoice.create(req.body)
    await BillBook.findOneAndUpdate({ _id: billBook._id.toString() }, {
        $pull: { availableBills: billBookNumber },
        $push: {billsCreated: billBookNumber}
    }, {
        new: true,
        runValidators:true
    })
    res.status(StatusCodes.OK).json({msg:"Invoice Added"})
}

module.exports = {createInvoice}