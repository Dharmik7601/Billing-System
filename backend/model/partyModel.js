const mongoose = require('mongoose')

const partySchema = new mongoose.Schema({
    partyName: {
        type: String,
        required: [true, 'Please provide name'],
        unique: true
    },
    address: {
        type: String,
        required:[true,'Please provide address']
    },
    gstNo: {
        type: String,
        required: [true, 'Please provide GST NO.'],
        unique:true
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique:true
    },
    mobile: {
        type: Number,
        required: [true, 'Please provide mobile'],
        unique:true
    },
    ifscCode: {
        type: Number,
        required: [true, 'Please provide IFSC code']
    },
    accountNumber: {
        type: Number,
        required: [true, 'Please provide account number'],
        unique:true
    },
    accountName: {
        type: String,
        required: [true, 'Please provide account name'],
    },
    accountType: {
        type: String,
        enum:['saving','current','OD'],
        required: [true, 'Please provide account type'],
    },
    partyType: {
        type: String,
        required: [true, 'Please provide partyType'],
        enum:['supplier','buyer','both']
    },
    productLists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'PartyProduct'
    }]
}, {
    timestamps:true
})

module.exports = mongoose.model("Party",partySchema)