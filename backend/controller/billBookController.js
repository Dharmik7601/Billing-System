const BillBook = require('../model/billBookModel')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../error')
const Invoice = require('../model/invoiceModel')

const createBillBook = async (req, res) => {
    const billBook = await BillBook.create(req.body)
    let availableBills = []
    let i = 0
    const bills = () => {
        while (i < billBook.noOfBills) {
            availableBills.push(billBook.billBookStartNumber + i)
            i++
        }
    }
    await bills()
    billBook.availableBills = availableBills
    await billBook.save()
    res.status(StatusCodes.OK).json({msg:'Bill book added'})
}

const getAllBillBooks = async (req, res) => {
    const billBooks = await BillBook.find({})
    let billbooksList = []
    let i=1
    const bb = billBooks.map((bill) => {
            billbooksList.push({
                id: i,
                billBookName: bill.billBookName,
                billBookType: bill.billBookType,
                billBookStartNumber: bill.billBookStartNumber,
                noOfBills: bill.noOfBills,
                availableBills: bill.availableBills.length,
                financialYear: bill.financialYear
            })
            i++;
        })
    await Promise.all(bb)
    res.status(StatusCodes.OK).json(billbooksList)
}

const getAllBillBooksName = async (req, res) => {
    const { billBookType } = req.params
    const billBooks = await BillBook.find({ billBookType: billBookType })
    if(billBooks.length === 0) throw new NotFoundError(`No bill book found with type: ${billBookType}`)
    let billbooksList = []
    const bb = billBooks.map((bill) => {
            billbooksList.push(
                bill.billBookName
            )
        })
    await Promise.all(bb)
    res.status(StatusCodes.OK).json(billbooksList)
}

const getBillInfo = async (req, res) => {
    const {billBookName} = req.body
    const billBook = await BillBook.findOne({billBookName:billBookName})
    const billbooksList = {
        billBookType: billBook.billBookType,
        availableBills: billBook.availableBills
    }
    res.status(StatusCodes.OK).json(billbooksList)
}

const bills = async (req, res) => {
    const { name, id } = req.body;
    const b = await BillBook.findOneAndUpdate({ billBookName: name }, {
        $pull: {availableBills:id}
    })
    res.status(StatusCodes.OK).json({msg:"done",b})
}

const getNextBill = async (req, res) => {
    const { billBookName } = req.params;
    const b = await BillBook.findOne({ billBookName: billBookName }).select("availableBills financialYear")
    if(!b) throw new NotFoundError(`No bill found`)
    let billDetails = {
        lastBill: b.availableBills[0],
        billBookFinancialYear: b.financialYear
    } 
    res.status(StatusCodes.OK).json(billDetails)
}

const getBillBookDetails = async (req, res) => {
    const { billBookName } = req.params
    const billBook = await BillBook.findOne({ billBookName: billBookName })
    if (!billBook) throw new NotFoundError(`No bill book found with name: ${billBookName}`)
    let billList = []
    let i = 1
    const createdBills = billBook.billsCreated.sort()
    const b = createdBills.map( async (billNumber) => {
        const invoice = await Invoice.findOne({ billBookName: billBookName, billBookNumber: billNumber })
        if (invoice) {
            billList.push({
                id: i,
                billId: invoice._id.toString(),
                billBookNumber: invoice.billBookNumber,
                billDate: invoice.billDate.toDateString(),
            })
            i++
        }
    })
    await Promise.all(b)
    res.status(StatusCodes.OK).json(billList)
}

module.exports = {createBillBook,getAllBillBooks,bills,getAllBillBooksName,getBillInfo,getNextBill,getBillBookDetails}