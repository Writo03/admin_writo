import React, { useEffect, useState } from "react"
import  PostForm from "./components/PostForm"
import { useParams } from "react-router-dom"
import Loader from "./components/Loader"
import axiosInstance from "./utils/axiosIntance"

const EditPost = () => {
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const { postId } = useParams()


  useEffect(() => {
    const getPost = async (postId) => {
      try {
        const post = await axiosInstance.get(`/get-blog/${postId}`)
        setPost(post.data.blog)
        setIsError(false)
        setIsLoading(false)
      } catch (error) {
        setIsError(true)
        setIsLoading(false)
      }
    }
    getPost(postId)
  }, [postId])

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center font-bold">
        Something went wrong
      </div>
    )
  }

  return (
    <div className="py-8">
      <PostForm post={post} />
    </div>
  )
}

export default EditPost
