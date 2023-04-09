const Invoice = require('../model/invoiceModel')
const { StatusCodes } = require('http-status-codes')
const BillBook = require('../model/billBookModel')
const Party = require('../model/partyModel')
const { NotFoundError } = require('../error')
const Company = require('../model/companyModel')

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
    res.status(StatusCodes.OK).json({msg:"Invoice Added",invoiceId: invoice._id.toString()})
}

const getInvoiceInfo = async (req,res) => {
    const { invoiceId } = req.params;
    const invoice = await Invoice.findOne({ _id: invoiceId }) 
    if (!invoice) throw new NotFoundError(`No invoice found with ID: ${invoiceId}`)
    const party = await Party.findOne({ partyName: invoice.partyName })
    if (!party) throw new NotFoundError(`No party found`)
    const company = await Company.findOne({})
    if (!company) throw new NotFoundError(`No company found`)
    res.status(StatusCodes.OK).json({
        invoiceDetails: {
            invoiceId: invoice._id.toString(),
            billBookName: invoice.billBookName,
                billBookNumber:invoice.billBookNumber,
                billBookType: invoice.billBookType,
                partyName: invoice.partyName,
                billBookFinancialYear:invoice.billBookFinancialYear,
                billDate: invoice.billDate.toDateString(),
                billingAddress: invoice.billingAddress,
                shippingName: invoice.shippingName,
                shippingType: invoice.shippingType,
                shippingAddress: invoice.shippingAddress,
                billDueDate: invoice.billDueDate.toDateString()
        },
        itemDetails:invoice.itemList,
        companyDetails: {
        companyName: company.companyName,
        companyAddress: company.companyAddress,
        companyGstNumber: company.gstNumber,
        companyAccountNumber: company.accountNumber,
        companyIfscCode: company.ifscCode,
        companyEmail: company.companyEmail
        },
        partyDetails: {
            partyEmail: party.email,
            partyMobile: party.mobile
        }
    })
}

module.exports = {createInvoice,getInvoiceInfo}