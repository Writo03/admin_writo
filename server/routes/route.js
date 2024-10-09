const control = require('../controller/controller')
const express=require('express')
const router = express.Router()

router.get('/get-students',control.student_details)

router.get('/get-mentors',control.mentor_details)

router.get('/mentor-student/:id',control.mentor_student)

module.exports = router