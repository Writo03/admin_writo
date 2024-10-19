const express = require("express")
const router= express.Router()
const control = require("../controller/user.controller.js")
const verifyUser = require('../middleware/auth.middleware.js')

router.route("/login").post(control.loginUser)
router.route("/check-login").get(control.checkLogin)
router.route("/add-admin").post(verifyUser, control.addAdmin)

module.exports = router