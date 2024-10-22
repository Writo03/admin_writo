import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import parser from "html-react-parser"
import Loader from "./components/Loader"
import {FaEdit, FaTrashAlt} from "react-icons/fa"

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true)
      try {
        const res = await axios.get("http://localhost:8080/get-blogs")
        setIsError(false)
        setBlogs(res.data.blogs)
      } catch (error) {
        setIsError(true)
        setError("No blogs available")
      } finally {
        setLoading(false)
      }
    }
    getBlogs()
  }, [])


  const deleteBlog = async (blogId) => {
    try {
      setBlogs((prev) => prev.filter((blog) => blog._id !== blogId))
      await axios.delete(`http://localhost:8080/delete-blog/${blogId}`)
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return <Loader/>
  }

  if (isError) {
    return <div className="h-screen flex items-center justify-center font-bold">{error}</div>
  }
  return (
    <div className="flex flex-wrap justify-center gap-10">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-300"
        >
          <img
            alt={blog.name}
            className="h-72 w-80 rounded-lg object-cover"
            src={blog.image}
          />
          <div className="flex w-80 flex-col items-start justify-start p-4 space-y-2">
            <h2 className="line-clamp-1 text-xl font-semibold text-gray-900 md:text-2xl lg:text-3xl transition-colors duration-300 hover:text-[#488B80]">
              {blog.title}
            </h2>
            <h3 className="line-clamp-2 text-gray-600 text-sm md:text-base">
              {parser(blog.content)}
            </h3>
            <div className="flex gap-4 mt-4">
              <button onClick={() => navigate(`/edit-blog/${blog._id}`)} className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">
                <FaEdit /> Edit
              </button>
              <button onClick={() => deleteBlog(blog._id)} className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition">
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        </div>
        
      ))}
    </div>
  )
}

export default Blogs
