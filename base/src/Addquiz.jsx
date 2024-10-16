import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Addquiz = () => {
  const [test, setTest] = useState('');
  const [number, setNumber] = useState(0);
  const [flag, setFlag] = useState(true);
  const [flag2, setFlag2] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correct, setCorrect] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleTestSubmit = () => {
    setFlag(false);
  };
  
  const navigate = useNavigate();

  const handleQuestionSubmit = async () => {
    setQuestions([...questions, { question, option1, option2, option3, option4, correct }]);
    setQuestion('');
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
    setCorrect('');
    setNumber(number - 1);
    if (0 === number) await setFlag2(false);
  };

  const handleSubmit = () => {
    axios.post(`https://admin-writo.onrender.com/add-quiz`, { test, questions })
      .then(result => {
        console.log(result);
        setIsSubmitted(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      });
  };

  useEffect(() => {
    if (!flag) {
      console.log(test, number);
    }
  }, [flag, flag2]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      {isSubmitted && (
        <div className="bg-green-200 text-green-800 p-4 mb-6 rounded-lg w-full max-w-md text-center">
          Quiz successfully submitted! Redirecting...
        </div>
      )}

      {flag && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-semibold text-center mb-4">Create a New Quiz</h1>
          <label className="block font-semibold mb-2">Test Name</label>
          <input
            type="text"
            className="border rounded-lg px-4 py-2 mb-4 w-full"
            name="testName"
            onChange={(e) => setTest(e.target.value)}
          />
          <label className="block font-semibold mb-2">Number of Questions</label>
          <input
            type="number"
            className="border rounded-lg px-4 py-2 mb-4 w-full"
            name="number"
            onChange={(e) => setNumber(e.target.value - 1)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
            onClick={handleTestSubmit}
          >
            Start Creating Quiz
          </button>
        </div>
      )}

      {!flag && flag2 && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-6">
          <h2 className="text-xl font-semibold text-center mb-4">Add a Question</h2>
          <label className="block font-semibold mb-2">Question</label>
          <input
            type="text"
            className="border rounded-lg px-4 py-2 mb-4 w-full"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
          />
          <label className="block font-semibold mb-2">Option 1</label>
          <input
            type="text"
            className="border rounded-lg px-4 py-2 mb-4 w-full"
            onChange={(e) => setOption1(e.target.value)}
            value={option1}
          />
          <label className="block font-semibold mb-2">Option 2</label>
          <input
            type="text"
            className="border rounded-lg px-4 py-2 mb-4 w-full"
            onChange={(e) => setOption2(e.target.value)}
            value={option2}
          />
          <label className="block font-semibold mb-2">Option 3</label>
          <input
            type="text"
            className="border rounded-lg px-4 py-2 mb-4 w-full"
            onChange={(e) => setOption3(e.target.value)}
            value={option3}
          />
          <label className="block font-semibold mb-2">Option 4</label>
          <input
            type="text"
            className="border rounded-lg px-4 py-2 mb-4 w-full"
            onChange={(e) => setOption4(e.target.value)}
            value={option4}
          />
          <label className="block font-semibold mb-2">Correct Option</label>
          <input
            type="text"
            className="border rounded-lg px-4 py-2 mb-4 w-full"
            onChange={(e) => setCorrect(e.target.value)}
            value={correct}
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
            onClick={handleQuestionSubmit}
          >
            Add Question
          </button>
        </div>
      )}

      {!flag && !flag2 && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-6">
          <h2 className="text-xl font-semibold text-center mb-4">Submit Quiz</h2>
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Addquiz;
