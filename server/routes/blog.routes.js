const control = require("../controller/blog.controller.js")
const express = require("express")
const router = express.Router()
const verifyUser = require("../middleware/auth.middleware.js")
const upload = require("../middleware/multer.middleware.js")

router.use(verifyUser)

router.route("/add-blog").post(upload.single("image"), control.addBlog)
router.route("/get-blogs").get(control.getBlogs)
router.route("/get-blog/:id").get(control.getBlogById)
router.route("/update-blog/:id").patch(control.updateBlog)
router.route("/delete-blog/:id").delete(control.deleteBlog)
router.route("/update-blog-image/:id").patch(upload.single("image"), control.updateBlogImage)
module.exports = router