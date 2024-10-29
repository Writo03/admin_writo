const express = require("express")
const router = express.Router()
const control = require("../controller/contact.controller.js")
const verifyUser = require("../middleware/auth.middleware.js")

router.use(verifyUser)

router.route("/get-requests").get(control.getContactRequests)

module.exports = router