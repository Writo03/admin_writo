import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="space-y-4">
        <Link to={'/student-list'}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out">
            Students
          </button>
        </Link>

        <Link to={'/mentor-list'}>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out">
            Mentors
          </button>
        </Link>

        <Link to={'/add-quiz'}>
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out">
            Add Quiz
          </button>
        </Link>
        <Link to={'/all-quizes'}>
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out">
            Show quizes
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home