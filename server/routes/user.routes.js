const express = require("express")
const router= express.Router()
const control = require("../controller/user.controller.js")

router.post("/login", control.loginUser)

module.exports = router