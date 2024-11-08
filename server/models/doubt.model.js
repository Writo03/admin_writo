const mongoose = require("mongoose")

const DoubtSchema = new mongoose.Schema({
   user:{
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
   }
}, {timestamps : true})

const DoubtModel = mongoose.model("Doubt", DoubtSchema)
module.exports = DoubtModel