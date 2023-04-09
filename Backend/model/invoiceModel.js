const mongoose = require('mongoose')

const invoiceSchema = mongoose.Schema({
    billBookType: {
        type: String,
        required: [true,'Please provide bill book type']
    },
    billBookName: {
        type: String,
        required: [true,'Please provide bill book name']
    },
    billBookNumber: {
        type: Number,
        required: [true,'Please provide bill book number']
    },
    billDate: {
        type: Date,
        required: [true,'Please provide bill date']
    },
    billBookFinancialYear: {
        type: String,
        required: [true,'Please provide bill book financial year']
    },
    partyName: {
        type: String,
        required: [true,'Please provide party name']
    },
    billingAddress: {
        type: String,
        required: [true,'Please provide bill address']
    },
    billDueDate: {
        type: Date,
        required: [true,'Please provide bill due date']
    },
    shippingType: {
        type: String,
        required:[true,'Please provide shipping type']
    },
    shippingName: {
        type: String,
        required:[true,'Please provide shipping name']
    },
    shippingAddress: {
        type: String,
        required:[true,'Please provide shipping address']
    },
    itemList: [{
            _id: false,
            itemName: {
                type: String,
                required: [true,'Please provide item name']
            },
            itemPrice: {
                type: Number,
                required: [true,'Please provide item price']
            },
            itemQuantity: {
                type: Number,
                required: [true,'Please provide item quantity']
            },
            itemQuantityType: {
                type: String,
                required: [true,'Please provide item quantity type']
            },
        }]
})

module.exports = mongoose.model('Invoice',invoiceSchema)