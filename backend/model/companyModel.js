const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: [true,'Please provide company name']
    },
    companyAddress: {
        type: String,
        required: [true,'Please provide company address']
    },
    gstNumber: {
        type: String,
        required: [true,'Please provide gst number']
    },
    ifscCode: {
        type: String,
        required: [true,'Please provide ifsc code']
    },
    accountNumber: {
        type: String,
        required: [true,'Please provide account number']
    },
    companyEmail: {
        type: String,
        required: [true,'Please provide company email']
    }
})

module.exports = mongoose.model('Company',companySchema)