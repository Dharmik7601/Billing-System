const mongoose = require('mongoose')

const shippingSchema = mongoose.Schema({
    shippingName: {
        type: String,
        unique: true,
        required: [true,'Please provide shipping name']
    },
    shippingDescription: {
        type: String,
        required: [true,'Please provide shipping description']
    },
    shippingType: {
        type: String,
        required: [true,'Please provide shipping type']
    },
    shippingOfficeAddress: {
        type: String,
        required:[true,'Please provide shipping office address']
    },
    gstNumber: {
        type: String,
        required:[true,'Please provide shipping gst number']
    },
    accountNumber: {
        type: Number,
        required:[true,'Please provide shipping account number']
    },
    email: {
        type: String,
        unique: true,
        required:[true,'Please provide shipping email']
    },
    mobile: {
        type: String,
        unique: true,
        required:[true,'Please provide shipping mobile number']
    }
})

module.exports = mongoose.model("Shipping",shippingSchema)