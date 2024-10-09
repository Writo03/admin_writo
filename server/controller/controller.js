const UserModel = require('../models/user')


const student_details = (req,res)=>{
    UserModel.find({},'name student email student_course')
    .then(result=>{
        result2=result.filter(user=>user.student)
        res.json(result2)
    })
}

const mentor_details = (req,res)=>{
    UserModel.find({},'name mentor email mentor_subject')
    .then(result=>{
        result2=result.filter(user=>user.mentor)
        res.json(result2)
    })
}

const mentor_student = (req,res)=>{
    const id = req.params.id
    // UserModel.findById(id)
    // .then(result=>)
}



module.exports={
    student_details,
    mentor_details,
    mentor_student,
}