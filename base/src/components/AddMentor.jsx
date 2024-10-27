import React, { useState } from 'react'
import axiosInstance from '../utils/axiosIntance'

const AddMentor = ({toggleModal}) => {
    const [email, setEmail] = useState("")
    const [response, setResponse] = useState("")
    const [isAddingMentor, setIsAddingMentor] = useState(false)
    const [access, setAccess] = useState([])

    const handleAddMentor = async () => {
        if(!email || !access.length){
            setResponse("Please enter email and provide access both")
            return
        }
        setIsAddingMentor(true)
        try {
            const res = await axiosInstance.post(
                "/add-mentor",
                { email, access },
            )
            console.log(res)
            setEmail("")
            setAccess([])
            setResponse(res.data.message)
        } catch (error) {
            setResponse(error.response.data)
        } finally {
            setIsAddingMentor(false)
        }
    }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 className="text-lg font-bold mb-4">Add Mentor</h2>
      <input
        type="email"
        placeholder="Enter admin email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
      />
      <label htmlFor='access'>Access</label>
      <select
        multiple
        className="w-full mb-4 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
        value={[...access]}
        onChange={(e) => setAccess([...e.target.selectedOptions].map(opt => opt.value))}
        name='Access'
      >
        <option value="QUIZ">Quiz</option>
        <option value="BLOG">Blog</option>
      </select>

      {response && <p className="text-red-500 mb-4">{response}</p>}
      <div className="flex justify-end gap-2">
        <button
          onClick={toggleModal}
          className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={handleAddMentor}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md flex items-center"
        >
          {isAddingMentor ? (
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
            "Add Mentor"
          )}
        </button>
      </div>
    </div>
  </div>
  )
}

export default AddMentor
