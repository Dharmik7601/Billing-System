const mongoose = require('mongoose')

const productTemplateSchema = new mongoose.Schema({
    partyName: {
        type: String,
        required:[true,'PLease provide product name']
    },
    templateName: {
        type: String,
        unique: true,
        default: 'Default',
        required:[true,'Please provide product template name']
    },
    productList: [
        {
            _id: false,
            productName: {
                type: String,
                required: [true,'Please provide product name']
            },
            productPrice: {
                type: Number,
                required: [true,'Please provide product price']
            }
        }
    ]
    // productPrice: {
    //     type: Number,
    //     requried:[true,'Please provide price']
    // },
    // productQuantity: {
    //     type: Number,
    //     requried: [true, 'Please provide product quantity'],
    // },
    // productQuantityType: {
    //     type: String,
    //     requried:[true,"Please provide quantity type"]
    // },
    // productSize: {
    //     type: String,
    //     required:[true,'Please provide product size']
    // }
}, {
    timestamps:true
})

module.exports = mongoose.model("ProductTemplate",productTemplateSchema)