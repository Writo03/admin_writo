const jwt = require("jsonwebtoken")
const userModel = require("../models/user")

const verifyUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
      return res.status(401).send("Unauthorized request")
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await userModel
      .findById(decodedToken.id)
      .select("-password -student -mymentors -mystudents")

    if (!user) {
      return res.status(401).send("Invalid access token")
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).send("Invalid access token")
  }
}

module.exports = verifyUser
