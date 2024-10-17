const BlogModel = require("../models/blog")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const addBlog = async (req, res) => {
  try {
    const { title, content } = req.body
    if (!title || !content) {
      return res.status(404).send("All fields are required")
    }

    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")
    if(!token){
      return res.status(401).send("Unauthorized request")
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const blog = await BlogModel.create({
      title,
      content,
      author: decodedToken.id,
    })

    return res.status(201).json({
      message: "Blog created successfully",
      blog,
    })
  } catch (error) {
    console.log("error while creating blog", error)
    res.status(500).send("Internal server error")
  }
}

const getBlogs = async (req, res) => {
  try {
    const { page = "1", limit = "20" } = req.query
    const rPage = parseInt(page.toString())
    const rLimit = parseInt(limit.toString())

    const blogs = await BlogModel.aggregate([
      {
        $match: {},
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
          pipeline: [
            {
              $project: {
                name: 1,
                email: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          author: {
            $first: "$author",
          },
        },
      },
      {
        $skip: (rPage - 1) * rLimit,
      },
      {
        $limit: rLimit,
      },
    ])

    const total = await BlogModel.countDocuments()

    if (!blogs.length) {
      return res.status(404).send("No blogs found")
    }

    return res.status(200).json({
      message: "Blogs fetched successfully",
      blogs,
      total,
      page: rPage,
      pages: Math.ceil(total / rLimit),
    })
  } catch (error) {
    console.log("error while fetching blogs", error)
    res.status(500).send("Internal server error while getting blogs")
  }
}

const getBlogById = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await BlogModel.aggregate([
            {
                $match : {
                    _id : new mongoose.Schema.Types.ObjectId(id)
                }
            },
            {
                $lookup : {
                    from : "users",
                    localField : "author",
                    foreignField : "_id",
                    as : "author",
                    pipeline : [
                        {
                            $project : {
                                name : 1,
                                email : 1
                            }
                        }
                    ]
                }
            },
            {
                $addFields : {
                    author : {
                        $first : "$author"
                    }
                }
            }
        ])

        if(!blog.length){
            return res.status(404).send("Blog not found")
        }

        return res.status(200).json({message : "Blog fetched successfully", blog})
    } catch (error) {
        console.log("error while fetching blog", error)
        res.status(500).send("Internal server error while getting blog")
    }
}

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params
        const { title, content } = req.body
        if(!title || !content){
            return res.status(404).send("All fields are required")
        }

        const blog = await BlogModel.findByIdAndUpdate(id, {
           $set : {
            title, 
            content
           }
        }, {
            new : true
        })

        if(!blog){
            return res.status(404).send("Blog not found")
        }

        return res.status(200).json({message : "Blog updated successfully", blog})
    } catch (error) {
        console.log("error while updating blog", error)
        res.status(500).send("Internal server error while updating blog")
    }
}

const deleteBlog = async (req, res) => {
    try {
        const {id} = req.params
        const blog = await BlogModel.findByIdAndDelete(id)
        if(!blog){
            return res.status(404).send("Blog not found")
        }
        return res.status(200).json({message : "Blog deleted successfully"})
    } catch (error) {
        console.log("error while deleting blog", error)
        res.status(500).send("Internal server error while deleting blog")
    }
}

module.exports = {
    addBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog    
}
