const control = require("../controller/blog.controller.js")
const express = require("express")
const router = express.Router()

router.post("/add-blog", control.addBlog)
router.get("/get-blogs", control.getBlogs)
router.get("/get-blog/:id", control.getBlogById)
router.patch("/update-blog/:id", control.updateBlog)
router.delete("/delete-blog/:id", control.deleteBlog)

module.exports = router