import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTest = () => {
  const { id } = useParams(); // Get the quiz id from the route parameters
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Fetch the quiz data by id
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`https://writo-education-frontend.onrender.com/api/quiz/get-quiz/${id}`);
        setQuiz(response.data); // Assuming response.data contains the quiz object
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  // Handle input changes for each question
  const handleInputChange = (e, questionIndex, field) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex][field] = e.target.value;
    setQuiz({
      ...quiz,
      questions: updatedQuestions
    });
  };

  // Function to handle deleting a question
  const handleDeleteQuestion = (questionIndex) => {
    const updatedQuestions = quiz.questions.filter((_, index) => index !== questionIndex);
    setQuiz({
      ...quiz,
      questions: updatedQuestions
    });
  };

  // Function to handle saving the edited quiz (PUT request)
  const handleSave = async () => {
    try {
      const response = await axios.put(`https://writo-education-frontend.onrender.com/update-quiz/${id}`, quiz);
      console.log('Quiz updated:', response.data);
      navigate('/all-quizes')
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };

  // Function to handle deleting the entire quiz
  const handleDeleteQuiz = async () => {
    try {
      await axios.delete(`https://writo-education-frontend.onrender.com/delete-quiz/${id}`);
      navigate('/'); // Use navigate instead of history.push
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Quiz: {quiz.test_name}</h2>

      {quiz.questions.map((question, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <label className="block text-sm font-medium text-gray-700">Question {index + 1}</label>
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleInputChange(e, index, 'question')}
            className="block w-full p-2 border rounded mb-2"
            placeholder="Enter question"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={question.option1}
              onChange={(e) => handleInputChange(e, index, 'option1')}
              className="block w-full p-2 border rounded"
              placeholder="Option 1"
            />
            <input
              type="text"
              value={question.option2}
              onChange={(e) => handleInputChange(e, index, 'option2')}
              className="block w-full p-2 border rounded"
              placeholder="Option 2"
            />
            <input
              type="text"
              value={question.option3}
              onChange={(e) => handleInputChange(e, index, 'option3')}
              className="block w-full p-2 border rounded"
              placeholder="Option 3"
            />
            <input
              type="text"
              value={question.option4}
              onChange={(e) => handleInputChange(e, index, 'option4')}
              className="block w-full p-2 border rounded"
              placeholder="Option 4"
            />
          </div>
          <label className="block text-sm font-medium text-gray-700 mt-2">Correct Option</label>
          <input
            type="text"
            value={question.correct_option}
            onChange={(e) => handleInputChange(e, index, 'correct_option')}
            className="block w-full p-2 border rounded"
            placeholder="Enter correct option"
          />
          
          <button
            onClick={() => handleDeleteQuestion(index)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 mt-2 rounded"
          >
            Delete Question
          </button>
        </div>
      ))}

      <button
        onClick={handleSave}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
      >
        Save Changes
      </button>

      <button
        onClick={handleDeleteQuiz}
        className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 mt-4 rounded"
      >
        Delete Entire Quiz
      </button>
    </div>
  );
};

export default EditTest;