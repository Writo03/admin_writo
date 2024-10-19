const control = require("../controller/blog.controller.js")
const express = require("express")
const router = express.Router()
const verifyUser = require("../middleware/auth.middleware.js")

router.route("/add-blog").post(verifyUser,control.addBlog)
router.route("/get-blogs").get(control.getBlogs)
router.route("/get-blog/:id").get(control.getBlogById)
router.route("/update-blog/:id").patch(control.updateBlog)
router.route("/delete-blog/:id").delete(control.deleteBlog)

module.exports = router