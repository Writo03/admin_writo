const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const mongoose = require('mongoose')
const router = require('./routes/route')
const quizRouter = require('./routes/quizRoute')
const cors=require('cors')
const allowedOrigins = ['https://admin-writo.vercel.app/',"http://localhost:3000","http://localhost:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

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