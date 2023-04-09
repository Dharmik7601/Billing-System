const mongoose = require('mongoose')

const billBookSchema = new mongoose.Schema({
    billBookName: {
        type: String,
        required: [true, 'Please provide name'],
        unique: true
    },
    billBookDescription: {
        type: String,
        required:[true,'Please provide bill book description']
    },
    billBookType: {
        type: String,
        required: [true, 'Please provide bill book type.'],
    },
    billBookStartNumber: {
        type: Number,
        required: [true, 'Please provide bill book start number'],
    },
    noOfBills: {
        type: Number,
        required: [true, 'Please provide no of bills'],
    },
    availableBills: [{
        type: Number
    }],
    billsCreated: [{
        type: Number
    }],
    financialYear: {
        type: String,
        required: [true, 'Please provide financial year'],
    }
}, {
    timestamps:true
})

module.exports = mongoose.model("BillBook",billBookSchema)