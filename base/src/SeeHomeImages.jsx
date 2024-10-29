import React, { useEffect, useState } from 'react'
import axiosInstance from './utils/axiosIntance'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

const SeeHomeImages = () => {
  const user = useSelector(state=> state.user.userData)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState({
    error : false,
    errorMsg : ""
  })
  const [images, setImages] = useState([])
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [response, setResponse] = useState("")
  const [priority, setPriority] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [isRefresh, setIsRefresh] = useState(false)


  useEffect(() => {
    
    const getHomeImages = async () => {
      setIsLoading(true)
      try {
        const res = await axiosInstance.get("/get-images")
        setImages(res.data.images)
        setIsError({
          error : false,
          errorMsg : ""
        })  
      } catch (error) {
        setIsError({
          error : true,
          errorMsg : error.response.data
        })
      }finally {
        setIsLoading(false)
      }
    }
    if(!user.isAdmin && !user.mentor_access?.includes("HOMEIMAGE")){
      navigate("/")
    }else {
      getHomeImages()
    }
  }, [user.isAdmin, user.mentor_access, navigate, isRefresh])

  const handleDelete = async (id) => {
    setImages((prev) => prev.filter((image) => image._id !== id))
    await axiosInstance.delete(`/delete-image/${id}`)
  }

  const toggleModal = (priority, id) => {
    if(!isModalOpen){
      setPriority(priority)
      setSelectedId(id)
    }
    setIsModalOpen(!isModalOpen)
  }

  const handleChangePriority = async () => {
    setIsUpdating(true)
    try {
      const res = await axiosInstance.patch(`/change-priority/${selectedId}`, {
        priority,
      })
      setResponse(res.data.message)
      setIsRefresh(!isRefresh)
    } catch (error) {
      setResponse(error.response.data)
    }
    setIsUpdating(false)
  }


  if(isLoading){
    return (
      <div className="h-screen flex items-center justify-center">
        <svg className="animate-spin h-5 w-5 text-blue-500 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z" />
          </svg>
      </div>
    )
  }

  if(isError.error){
    return (
      <div className="h-screen flex items-center justify-center font-bold">
        {isError.errorMsg}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Home Images</h1>
          <button 
            onClick={() => navigate('/add-home-image')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Add New Image
          </button>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No images found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((item) => (
              <div 
                key={item._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
              >
                <div className="relative aspect-video">
                  <img
                    src={item.image}
                    alt="Home page"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Priority: {item.priority}
                    </span>
                    {item.redirection && (
                    <p className="text-sm text-gray-600 truncate">
                      Redirection: {item.redirection}
                    </p>
                  )}
                  </div>
                  
                  
                  
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-800 font-medium"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                      onClick={() => toggleModal(item.priority, item._id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Add Admin</h2>
            <input
              type="number"
              placeholder="Enter image priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
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
                onClick={handleChangePriority}
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md flex items-center"
              >
                {isUpdating ? (
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
                  "Update"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default SeeHomeImages
