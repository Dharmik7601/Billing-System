const mongoose = require('mongoose')

const productTemplateSchema = new mongoose.Schema({
    productName: {
        type: String,
        required:[true,'PLease provide product name']
    },
    templateName: {
        type: String,
        unique: true,
        default: 'Default',
        required:[true,'Please provide product template name']
    },
    productPrice: {
        type: Number,
        requried:[true,'Please provide price']
    },
    productQuantity: {
        type: Number,
        requried: [true, 'Please provide product quantity'],
    },
    productQuantityType: {
        type: String,
        requried:[true,"Please provide quantity type"]
    },
    productSize: {
        type: String,
        required:[true,'Please provide product size']
    }
}, {
    timestamps:true
})

module.exports = mongoose.model("ProductTemplate",productTemplateSchema)