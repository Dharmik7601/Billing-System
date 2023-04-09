const mongoose = require('mongoose')

const itemTemplateSchema = new mongoose.Schema({
    partyName: {
        type: String,
        required:[true,'PLease provide party name']
    },
    templateName: {
        type: String,
        required:[true,'Please provide template name']
    },
    templateDescription: {
        type: String,
        required: [true,'Please provide template description']
    },
    itemList: [
        {
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
        }
    ]
}, {
    timestamps:true
})

module.exports = mongoose.model("ItemTemplate",itemTemplateSchema)