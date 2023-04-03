const mongoose = require('mongoose')

const partyProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Please provide product name']
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref:"product"
    },
    productTemplateName: {
        type: String,
        default:"Default",
        required:[true,'Please provide template name']
    },
    productTemplateId: {
        type: mongoose.Types.ObjectId,
        ref:"ProductTemplate"
    },
    partyName: {
        type: String,
        required:[true,'Please provide party name']
    }
}, {
    timestampes:true
})

module.exports = mongoose.model('PartyProduct',partyProductSchema)