import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import RTE from "./TextEditor"
import { useEffect, useState } from "react"
import {FaEdit} from "react-icons/fa"
import Loader from "./Loader"
import axiosInstance from "../utils/axiosIntance"

const PostForm = ({ post }) => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
    },
  })
  const navigate = useNavigate()
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingBlog, setIsUploadingBlog] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleImageUpdate = async (e) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("image", e.target.files[0])
      await axiosInstance.patch(`/update-blog-image/${post._id}`, 
        formData,
      )
      navigate("/blogs")
    } catch (error) {
      console.log(error)
    }finally {
      setIsUploading(false)
    }
  }

  useEffect(() => {
    if (post) {
      // Reset form values when post data changes
      reset({
        title: post.title,
        content: post.content,
      })
    }
  }, [post, reset])

  const submit = async (data) => {
    if (post) {
      setIsUploadingBlog(true)
      try {
        const res = await axiosInstance.patch(
          `/update-blog/${post._id}`,
          {
            title: data.title,
            content: data.content,
          }
        )
        navigate("/blogs")
      } catch (error) {
        console.log(error)
      } finally{
        setIsUploadingBlog(false)
      }
    } else {
      setIsUploadingBlog(true)
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("content", data.content)
      formData.append("image", data.image[0])
      try {
        const res = await axiosInstance.post(
          "/add-blog",
          formData
        )
        navigate("/blogs")
      } catch (error) {
        console.log(error)
      } finally {
        setIsUploadingBlog(false)
      }
    }
  }
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap flex-col gap-4"
    >
      <div className="md:w-2/3 w-11/12 px-2">
        <input
          label="Title :"
          placeholder="Title"
          className="mb-4 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
          {...register("title", { required: true })}
          defaultValue={post?.title || ""}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={post?.content}
        />
      </div>
      <div className="md:w-1/3 w-3/4 px-2">
        {!post && (
          <input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
        )}
        {post && (
          <div className="w-full mb-4 relative">
            <img
              src={post.image}
              alt={post.title}
              className="rounded-lg"
              onClick={toggleModal}
            />
            {/* Edit icon in the top-right corner */}
            <button
              type="button"
              onClick={toggleModal}
              className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-900 text-white p-3 rounded-full"
            >
              <FaEdit/>
            </button>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
        >
          {isUploadingBlog ? <Loader/> : post ? "Update" : "Submit"}
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          {isUploading ? <Loader/> : <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Update Featured Image</h2>
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              onChange={(e) => handleImageUpdate(e)}
              className="mb-4"
            />
            <button
              type="button"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>}
        </div>
      )}
    </form>
  )
}

export default PostForm
