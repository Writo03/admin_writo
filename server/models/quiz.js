const mongoose = require('mongoose')

const subSchema = mongoose.Schema({
    question:String,
    image : String,
    option1:String,
    option2:String,
    option3:String,
    option4:String,
    correct:String
})

const quizSchema = mongoose.Schema({
    test_name:String,
    description : {
        type : String
    },
    questionsCount : {
        type : Number
    },
    test_type : {
        type : String,
        enum : ["jee-all", "neet-all", "jee-subject", "neet-subject"],
        required : true
    },
    subjects : {
        type : [String],
        default : []
    },
    time : {
        type : Number
    },
    questions:[subSchema]
}, {timestamps : true})

module.exports = mongoose.model('quiz',quizSchema)