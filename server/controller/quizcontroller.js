const QuizModel = require('../models/quiz')

const add_quiz = (req,res)=>{
    const quiz = new QuizModel(req.body)
    console.log(quiz)
    quiz.save()
    .then(result=>res.send('quiz added'))
}

const get_quizes = (req,res)=>{
    QuizModel.find()
    .then(result=>res.json(result))
}

const get_quiz =(req,res)=>{
    const id = req.params.id
    QuizModel.findById(id)
    .then(result=>{
        res.json(result)
    })
}

const update_quiz = (req, res) => {
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