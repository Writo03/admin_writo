const QuizModel = require('../models/quiz')

const checkUserCanUpadate = (req) => {
    if(!req.user && !req.user.isAdmin && !req.user.mentor_access?.includes("QUIZ")){
        return res.status(400).send("Only admin or mentor with access to quiz can access quiz")
    }
}

const add_quiz = (req,res)=>{
    checkUserCanUpadate(req)
    const quiz = new QuizModel(req.body)
    console.log(quiz)
    quiz.save()
    .then(result=>res.send('quiz added'))
}

const get_quizes = (req,res)=>{
    checkUserCanUpadate(req)
    QuizModel.find()
    .then(result=>res.json(result))
}

const get_quiz =(req,res)=>{
    checkUserCanUpadate(req)
    const id = req.params.id
    QuizModel.findById(id)
    .then(result=>{
        res.json(result)
    })
}

const update_quiz = (req, res) => {
    checkUserCanUpadate(req)
    const id = req.params.id;
    const updatedQuizData = req.body;

    QuizModel.findByIdAndUpdate(id, updatedQuizData, { new: true })
        .then(result => {
            if (!result) {
                return res.status(404).send('Quiz not found');
            }
            res.json({ message: 'Quiz updated successfully', quiz: result });
        })
        .catch(error => res.status(500).send('Error updating quiz'));
};

const delete_quiz = (req, res) => {
    checkUserCanUpadate(req)
    const id = req.params.id;
    QuizModel.findByIdAndDelete(id)
        .then(result => {
            if (!result) {
                return res.status(404).send('Quiz not found');
            }
            res.json({ message: 'Quiz deleted successfully' });
        })
        .catch(error => res.status(500).send('Error deleting quiz'));
};

module.exports = {
    add_quiz,
    get_quizes,
    get_quiz,
    update_quiz,
    delete_quiz
}