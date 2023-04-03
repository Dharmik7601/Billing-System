const mongoose = require('mongoose')

const productSchema = new  mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Please provide product name'],
        unique: true
    },
    productTemplates: [{
        type: mongoose.Types.ObjectId,
        ref: "ProductTemplate"
    }],
    productDescription: {
        type: String,
        required:[true,'Please provide product description']
    },
    soldBy: [{
        type: mongoose.Types.ObjectId,
        ref: "Party"
    }]
}, {
    timestampes: true
})

module.exports = mongoose.model('Product',productSchema)