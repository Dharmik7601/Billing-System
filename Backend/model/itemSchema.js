const mongoose = require('mongoose')

const itemSchema = new  mongoose.Schema({
    itemName: {
        type: String,
        required: [true, 'Please provide product name'],
        unique: true
    },
    itemTemplates: [{
        type: mongoose.Types.ObjectId,
        ref: "ProductTemplate"
    }],
    itemDescription: {
        type: String,
        required:[true,'Please provide product description']
    },
    soldBy: [{
        type: mongoose.Types.ObjectId,
        ref: "Party"
    }],
    itemQuantity: {
        type: Number,
        required: [true,'Please provide item quantity']
    },
    itemPrice: {
        type: Number,
        required: [true, 'Please provide item price']
    },
    itemSize: {
        type: String,
        required: [true,'Please provide item size']
    },
    itemQuantityType: {
        type: String,
        required: [true,'Please provide item quantity type']
    }
}, {
    timestampes: true
})

module.exports = mongoose.model('Item',itemSchema)