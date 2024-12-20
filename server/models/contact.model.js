const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {timestamps : true})

const ContactModel = mongoose.model("Contact", contactSchema)
module.exports = ContactModel