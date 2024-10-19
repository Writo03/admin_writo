const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},{
    timestamps: true
})

const BlogModel = mongoose.model("Blog",blogSchema)

module.exports = BlogModel