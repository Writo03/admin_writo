import React, { useEffect, useState } from "react"
import { PostForm } from "../components"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import axios from "axios"

const EditPost = () => {
  const [post, setPost] = useState(null)
  const { postId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getPost = async (postId) => {
      const post = await axios.get(
        `https://admin-writo.onrender.com/get-blog/${postId}`
      )
      return post
    }
    if (postId) {
      setPost(getPost(postId))
    } else {
      navigate("/")
    }
  }, [postId, navigate])

  return post ? (
    <div className="py-8">
      <PostForm post={post} />
    </div>
  ) : null
}

export default EditPost
