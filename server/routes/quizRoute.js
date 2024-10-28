const express=require('express')
const router = express.Router()
const quizController = require('../controller/quizcontroller')
const verifyUser = require("../middleware/auth.middleware.js")

router.use(verifyUser)

router.post('/add-quiz',quizController.add_quiz)

router.get('/get-quizes',quizController.get_quizes)

router.get('/get-quiz/:id',quizController.get_quiz)

router.put('/update-quiz/:id',quizController.update_quiz)

router.delete('/delete-quiz/:id',quizController.delete_quiz)

module.exports = router