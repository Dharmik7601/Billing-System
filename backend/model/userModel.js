const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter username'],
        unique: true
    },
    first_name: {
        type: String,
        required: [true, 'Please enter your first name'],
    },
    last_name: {
        type: String,
        required: [true, 'Please enter your last name'],
    },
    mobile: {
        type: Number,
        required: [true, 'Please enter your phone number'],
        unique:true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique:true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    otp: String,
    otpToken: String,
    otpTokenExp: Date
}, {
    timestampes:true
})

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    next()
})

userSchema.methods.checkPassword = async function (enteredPassword) {
    console.log(enteredPassword);
    console.log(this.password);
    const isMatch = await bcryptjs.compare(enteredPassword,this.password)
    console.log(isMatch);
    return isMatch
}

module.exports = mongoose.model("User",userSchema)