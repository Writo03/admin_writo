import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import {signOut} from "./redux/userSlice/userSlice"
import AddMentor from "./components/AddMentor"
import axiosInstance from "./utils/axiosIntance"

const Home = () => {
  const user = useSelector((state) => state.user.userData)
  const [isModalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [response, setResponse] = useState("")
  const [isAddingAdmin, setIsAddingAdmin] = useState(false)
  const [toggleAddMentor, setToggleAddMentor] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Toggle modal visibility
  const toggleModal = () => {
    setModalOpen(!isModalOpen)
    setResponse("")
  }

  // Handle the admin addition logic
  const handleAddAdmin = async () => {
    if (!email) {
      setResponse("Please enter email address")
      return
    }
    setIsAddingAdmin(true)
    try {
      const res = await axiosInstance.post(
        "/add-admin",
        { email })
      console.log(res)
      setEmail("")
      setResponse(res.data.message)
    } catch (error) {
      setResponse(error.response.data)
    } finally {
      setIsAddingAdmin(false)
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem("token")
    dispatch(signOut())
    navigate("/login")

  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      {user?.isAdmin && (
        <div>
          <button
            onClick={toggleModal}
            className="fixed top-4 right-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-lg"
          >
            Add Admin
          </button>
          <button
            onClick={()=> setToggleAddMentor(true)}
            className="fixed top-4 right-40 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-lg"
          >
            Add Mentor
          </button>
        </div>
      )}

      <div>
        <button
          onClick={handleLogOut}
          className="fixed bottom-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-lg"
        >
          Log out
        </button>
      </div>

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
        <Link to={"/add-blog"}>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-purple-500">Add Blog</h2>
            <p className="text-gray-600 mt-2">Create new blog</p>
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

        <Link to={"/home-image"}>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-purple-500">
              Home Image
            </h2>
            <p className="text-gray-600 mt-2">Home slider images</p>
          </div>
        </Link>
        <Link to={"/contact-requests"}>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-purple-500">
              Contact Requests
            </h2>
            <p className="text-gray-600 mt-2">View all contact requests from users.</p>
          </div>
        </Link>
        <Link to={"/doubt-requests"}>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-purple-500">
              Doubtsection Requests
            </h2>
            <p className="text-gray-600 mt-2">View all Doubtsection requests from users.</p>
          </div>
        </Link>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Add Admin</h2>
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            />
            {response && <p className="text-red-500 mb-4">{response}</p>}
            <div className="flex justify-end gap-2">
              <button
                onClick={toggleModal}
                className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAdmin}
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md flex items-center"
              >
                {isAddingAdmin ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  "Add Admin"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {
        toggleAddMentor && <AddMentor
        toggleModal={() => setToggleAddMentor(false)}
        />
      }
    </div>
  )
}

export default Home
