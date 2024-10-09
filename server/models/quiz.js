const mongoose = require('mongoose')

const subSchema = mongoose.Schema({
    question:String,
    option1:String,
    option2:String,
    option3:String,
    option4:String,
    correct_option:String
})

const quizSchema = mongoose.Schema({
    test_name:String,
    questions:[subSchema]
})

module.exports = mongoose.model('quiz',quizSchema)