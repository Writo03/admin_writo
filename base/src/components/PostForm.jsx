import React, { useCallback } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import RTE from "./TextEditor"
import axios from "axios"

const PostForm = ({ post }) => {
  const { register, handleSubmit, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
      },
    })
  const navigate = useNavigate()

  const submit = async (data) => {
    if(post){
      try {
        const res = await axios.patch(`https://admin-writo.onrender.com/update-blog/${post._id}`, {
          title : data.title,
          content : data.content
        })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }else{
      try {
        const res = await axios.post("https://admin-writo.onrender.com/add-post", {
          title : data.title,
          content : data.content
        })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap flex-col gap-4">
      <div className="md:w-2/3 w-11/12 px-2">
        <input
          label="Title :"
          placeholder="Title"
          className="mb-4 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
          {...register("title", { required: true })}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="md:w-1/3 w-3/4 px-2">
        <input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={post.img}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
        >
          {post ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  )
}

export default PostForm
