import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Home = () => {
  const user = useSelector((state) => state.user.userData)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {user?.isAdmin && (
        <div>
          <button>Add Admin</button>
        </div>
      )}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to the Quiz Management System
      </h1>
      <p className="text-gray-600 mb-8">
        Choose an option below to get started:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl px-4">
        <Link to={"/student-list"}>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-blue-500">Students</h2>
            <p className="text-gray-600 mt-2">
              View and manage the student list.
            </p>
          </div>
        </Link>

        <Link to={"/mentor-list"}>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-green-500">Mentors</h2>
            <p className="text-gray-600 mt-2">
              Explore and manage mentor profiles.
            </p>
          </div>
        </Link>

        <Link to={"/add-quiz"}>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-purple-500">Add Quiz</h2>
            <p className="text-gray-600 mt-2">Create new quizzes easily.</p>
          </div>
        </Link>

        <Link to={"/all-quizes"}>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-orange-500">
              Show Quizzes
            </h2>
            <p className="text-gray-600 mt-2">View all existing quizzes.</p>
          </div>
        </Link>
        <Link to={"/blogs"}>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-purple-500">
              Show Blogs
            </h2>
            <p className="text-gray-600 mt-2">View all existing blogs.</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Home
