const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const mongoose = require('mongoose')
const router = require('./routes/route')
const quizRouter = require('./routes/quizRoute')
const cors=require('cors')

app.use(cors({
    origin : 'http://localhost:5173',
    methods:["GET","POST","PUT","DELETE"],
    credentials : true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true})); 
const URL='mongodb+srv://sivamanik:A12345678b@cluster0.nsc1if7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(URL)
.then(()=>{
    app.listen(8080)
    console.log('8080')
})

app.use(router)
app.use(quizRouter)