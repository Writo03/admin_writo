import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import RTE from "./TextEditor"
import axios from "axios"

const PostForm = ({ post }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
    },
  })
  const navigate = useNavigate()

  const submit = async (data) => {
    console.log(data)
    if (post) {
      try {
        const res = await axios.patch(
          `http://localhost:8080/update-blog/${post._id}`,
          {
            title: data.title,
            content: data.content,
          }
        )
        console.log(res)
        navigate("/blogs")
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log(data)
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("content", data.content)
      formData.append("image", data.image[0])
      try {
        const res = await axios.post(
          "http://localhost:8080/add-blog",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        console.log(res)
      } catch (error) {
        console.log(error)
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
        <input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img src={post.image} alt={post.title} className="rounded-lg" />
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
