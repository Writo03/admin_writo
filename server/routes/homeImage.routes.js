const express = require("express")
const router = express.Router()
const verifyUser = require("../middleware/auth.middleware.js")
const control = require("../controller/homeImage.controller.js")
const upload = require("../middleware/multer.middleware.js")

router.use(verifyUser)

router.route("/add-image").post(upload.single("image"), control.addImage)
router.route("/change-priority/:imageId").patch(control.adjustPriority)
router.route("/delete-image/:imageId").delete(control.deleteImage)
router.route("/get-images").get(control.getHomeImgaes)

module.exports = router