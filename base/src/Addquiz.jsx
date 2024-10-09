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

  const handleTestSubmit = () => {
    setFlag(false);
  };
  const navigate = useNavigate()

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
      console.log(result)
      navigate('/')
    });

  };

  useEffect(() => {
    if (!flag) {
      console.log(test, number);
    }
  }, [flag, flag2]);

  return (
    <>
      {flag && (
        <div className="flex flex-col items-center gap-4 p-4">
          <label className="font-semibold">Test Name</label>
          <input
            type="text"
            className="border rounded px-3 py-1"
            name="testName"
            onChange={(e) => setTest(e.target.value)}
          />
          <label className="font-semibold">Number of questions</label>
          <input
            type="number"
            className="border rounded px-3 py-1"
            name="number"
            onChange={(e) => setNumber(e.target.value - 1)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleTestSubmit}
          >
            Submit
          </button>
        </div>
      )}
      {!flag && flag2 && (
        <div className="flex flex-col items-center gap-4 p-4">
          <label className="font-semibold">Question</label>
          <input
            type="text"
            className="border rounded px-3 py-1"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
          />
          <label className="font-semibold">Option 1</label>
          <input
            type="text"
            className="border rounded px-3 py-1"
            onChange={(e) => setOption1(e.target.value)}
            value={option1}
          />
          <label className="font-semibold">Option 2</label>
          <input
            type="text"
            className="border rounded px-3 py-1"
            onChange={(e) => setOption2(e.target.value)}
            value={option2}
          />
          <label className="font-semibold">Option 3</label>
          <input
            type="text"
            className="border rounded px-3 py-1"
            onChange={(e) => setOption3(e.target.value)}
            value={option3}
          />
          <label className="font-semibold">Option 4</label>
          <input
            type="text"
            className="border rounded px-3 py-1"
            onChange={(e) => setOption4(e.target.value)}
            value={option4}
          />
          <label className="font-semibold">Correct Option</label>
          <input
            type="text"
            className="border rounded px-3 py-1"
            onChange={(e) => setCorrect(e.target.value)}
            value={correct}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleQuestionSubmit}
          >
            Next
          </button>
        </div>
      )}
      {!flag && !flag2 && (
        <div className="flex flex-col items-center gap-4 p-4">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
};

export default Addquiz;
