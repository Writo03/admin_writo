const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/route');
const quizRouter = require('./routes/quizRoute');
const cors = require('cors');

// Allowed origins for CORS
const allowedOrigins = [
  'https://admin-writo.vercel.app',  // Removed trailing slash
  'http://localhost:3000',
  'http://localhost:5173'
];

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Apply CORS middleware to handle CORS with the specified options
app.use(cors(corsOptions));

// Handle preflight requests (OPTIONS method)
app.options('*', cors(corsOptions));

// Ensure proper headers are set for all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) !== -1) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Middleware to parse incoming requests with JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection URL
const URL = 'mongodb+srv://sivamanik:A12345678b@cluster0.nsc1if7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(URL)
  .then(() => {
    // Start the server once the database connection is successful
    app.listen(8080, () => {
      console.log('Server running on port 8080');
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// Use the router for handling routes
app.use(router);
app.use(quizRouter);
