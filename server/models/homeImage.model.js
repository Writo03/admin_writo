const mongoose = require("mongoose")

const homeImageSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    redirection : {
        type : String,
        default : ""
    },
    priority : {
        type : Number,
        required : true
    }
})

const HomeImageModel = mongoose.model("HomeImage",homeImageSchema)

module.exports = HomeImageModel